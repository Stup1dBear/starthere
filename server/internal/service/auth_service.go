package service

import (
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/stup1dbear/starthere/server/internal/config"
	"github.com/stup1dbear/starthere/server/internal/model"
	"github.com/stup1dbear/starthere/server/internal/repository"
	"github.com/stup1dbear/starthere/server/pkg/email"
	"github.com/stup1dbear/starthere/server/pkg/jwt"
	"github.com/stup1dbear/starthere/server/pkg/password"
)

// AuthService handles authentication business logic
type AuthService struct {
	userRepo   *repository.UserRepository
	jwtManager *jwt.Manager
	emailer    email.Emailer
	cfg        *config.EmailConfig
}

// NewAuthService creates a new auth service
func NewAuthService(userRepo *repository.UserRepository, jwtManager *jwt.Manager, emailer email.Emailer, cfg *config.EmailConfig) *AuthService {
	return &AuthService{
		userRepo:   userRepo,
		jwtManager: jwtManager,
		emailer:    emailer,
		cfg:        cfg,
	}
}

// RegisterRequest represents the registration request
type RegisterRequest struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
}

// LoginRequest represents the login request
type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// RegisterResponse represents the registration response
type RegisterResponse struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
}

// AuthResponse represents the authentication response
type AuthResponse struct {
	Token string      `json:"token"`
	User  *model.User `json:"user"`
}

// Register registers a new user
func (s *AuthService) Register(req *RegisterRequest) (*RegisterResponse, error) {
	// Check if email exists
	exists, err := s.userRepo.ExistsByEmail(req.Email)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("email already registered")
	}

	// Check if username exists
	exists, err = s.userRepo.ExistsByUsername(req.Username)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("username already taken")
	}

	// Hash password
	hashedPassword, err := password.Hash(req.Password)
	if err != nil {
		return nil, err
	}

	// Generate verification token
	verificationToken := uuid.NewString()
	now := time.Now().UnixMilli()

	// Create user
	user := &model.User{
		Username:           req.Username,
		Email:              req.Email,
		PasswordHash:       hashedPassword,
		IsVerified:         false,
		VerificationToken:  &verificationToken,
		VerificationSentAt: &now,
	}

	if err := s.userRepo.Create(user); err != nil {
		return nil, err
	}

	// Send verification email
	verifyURL := fmt.Sprintf("%s/verify-email?token=%s", s.cfg.FrontendURL, verificationToken)
	emailBody := email.VerificationEmailTemplate(verifyURL)
	subject := "🌟 验证你的 StartHere 邮箱"

	// Send email (log if error)
	if err := s.emailer.Send(user.Email, subject, emailBody); err != nil {
		// Don't fail registration on email error, just log
		fmt.Printf("Warning: Failed to send verification email: %v\n", err)
	}

	return &RegisterResponse{
		UserID: user.ID,
		Email:  user.Email,
	}, nil
}

// Login logs in a user
func (s *AuthService) Login(req *LoginRequest) (*AuthResponse, error) {
	// Find user by email
	user, err := s.userRepo.FindByEmail(req.Email)
	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	// Verify password
	if !password.Verify(req.Password, user.PasswordHash) {
		return nil, errors.New("invalid email or password")
	}

	// Check if email is verified
	if !user.IsVerified {
		return nil, errors.New("email not verified. Please check your inbox for the verification link")
	}

	// Generate token
	token, err := s.jwtManager.GenerateToken(user.ID, user.Username)
	if err != nil {
		return nil, err
	}

	return &AuthResponse{
		Token: token,
		User:  user,
	}, nil
}

// VerifyEmail verifies a user's email with token
func (s *AuthService) VerifyEmail(token string) error {
	// Find user by token
	user, err := s.userRepo.FindByVerificationToken(token)
	if err != nil {
		return errors.New("invalid or expired verification token")
	}

	// Check if already verified
	if user.IsVerified {
		return errors.New("email already verified")
	}

	// Check token expiry (24 hours)
	if user.VerificationSentAt != nil {
		tokenAge := time.Now().UnixMilli() - *user.VerificationSentAt
		if tokenAge > 24*60*60*1000 {
			return errors.New("verification token has expired. Please request a new one")
		}
	}

	// Update user
	now := time.Now().UnixMilli()
	user.IsVerified = true
	user.VerifiedAt = &now
	user.VerificationToken = nil // Clear token after use

	return s.userRepo.Update(user)
}

// ResendVerificationEmail resends the verification email
func (s *AuthService) ResendVerificationEmail(emailAddr string) error {
	// Find user by email
	user, err := s.userRepo.FindByEmail(emailAddr)
	if err != nil {
		// Don't reveal if email exists
		return nil
	}

	// Check if already verified
	if user.IsVerified {
		return nil
	}

	// Generate new verification token
	verificationToken := uuid.NewString()
	now := time.Now().UnixMilli()
	user.VerificationToken = &verificationToken
	user.VerificationSentAt = &now

	if err := s.userRepo.Update(user); err != nil {
		return err
	}

	// Send verification email
	verifyURL := fmt.Sprintf("%s/verify-email?token=%s", s.cfg.FrontendURL, verificationToken)
	emailBody := email.VerificationEmailTemplate(verifyURL)
	subject := "🌟 验证你的 StartHere 邮箱"

	// Send email (log if error)
	if err := s.emailer.Send(user.Email, subject, emailBody); err != nil {
		fmt.Printf("Warning: Failed to send verification email: %v\n", err)
	}

	return nil
}

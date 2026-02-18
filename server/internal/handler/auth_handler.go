package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/stup1dbear/starthere/server/internal/service"
	"github.com/stup1dbear/starthere/server/pkg/response"
)

// AuthHandler handles authentication endpoints
type AuthHandler struct {
	authService *service.AuthService
}

// NewAuthHandler creates a new auth handler
func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

// Register handles user registration
func (h *AuthHandler) Register(c *gin.Context) {
	var req service.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request body")
		return
	}

	// Validate required fields
	if req.Username == "" || req.Email == "" || req.Password == "" {
		response.BadRequest(c, "username, email, and password are required")
		return
	}

	registerResp, err := h.authService.Register(&req)
	if err != nil {
		if err.Error() == "email already registered" || err.Error() == "username already taken" {
			response.BadRequest(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to register user")
		return
	}

	response.SuccessWithMessage(c, "注册成功，请查收验证邮件", registerResp)
}

// Login handles user login
func (h *AuthHandler) Login(c *gin.Context) {
	var req service.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request body")
		return
	}

	// Validate required fields
	if req.Email == "" || req.Password == "" {
		response.BadRequest(c, "email and password are required")
		return
	}

	authResp, err := h.authService.Login(&req)
	if err != nil {
		if err.Error() == "invalid email or password" {
			response.Unauthorized(c, err.Error())
			return
		}
		if err.Error() == "email not verified. Please check your inbox for the verification link" {
			response.Unauthorized(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to login")
		return
	}

	response.Success(c, authResp)
}

// Me gets the current authenticated user
func (h *AuthHandler) Me(c *gin.Context) {
	userID, _ := c.Get("user_id")
	username, _ := c.Get("username")

	response.Success(c, gin.H{
		"id":       userID,
		"username": username,
	})
}

// VerifyEmail handles email verification via token
func (h *AuthHandler) VerifyEmail(c *gin.Context) {
	token := c.Query("token")
	if token == "" {
		response.BadRequest(c, "verification token is required")
		return
	}

	err := h.authService.VerifyEmail(token)
	if err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.SuccessWithMessage(c, "邮箱验证成功，现在可以登录了", nil)
}

// ResendVerificationEmail handles resending verification email
func (h *AuthHandler) ResendVerificationEmail(c *gin.Context) {
	var req struct {
		Email string `json:"email" binding:"required,email"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid email")
		return
	}

	// Always return success to not reveal if email exists
	h.authService.ResendVerificationEmail(req.Email)
	response.SuccessWithMessage(c, "如果该邮箱已注册，验证邮件已重新发送", nil)
}

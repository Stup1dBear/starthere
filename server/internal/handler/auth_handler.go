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

	authResp, err := h.authService.Register(&req)
	if err != nil {
		if err.Error() == "email already registered" || err.Error() == "username already taken" {
			response.BadRequest(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to register user")
		return
	}

	response.Success(c, authResp)
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

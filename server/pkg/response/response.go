package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Response is the standard API response format
type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// Success sends a success response
func Success(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, Response{
		Success: true,
		Data:    data,
	})
}

// SuccessWithMessage sends a success response with a message
func SuccessWithMessage(c *gin.Context, message string, data interface{}) {
	c.JSON(http.StatusOK, Response{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// Error sends an error response
func Error(c *gin.Context, statusCode int, err string) {
	c.JSON(statusCode, Response{
		Success: false,
		Error:   err,
	})
}

// BadRequest sends a 400 error
func BadRequest(c *gin.Context, err string) {
	Error(c, http.StatusBadRequest, err)
}

// Unauthorized sends a 401 error
func Unauthorized(c *gin.Context, err string) {
	Error(c, http.StatusUnauthorized, err)
}

// Forbidden sends a 403 error
func Forbidden(c *gin.Context, err string) {
	Error(c, http.StatusForbidden, err)
}

// NotFound sends a 404 error
func NotFound(c *gin.Context, err string) {
	Error(c, http.StatusNotFound, err)
}

// InternalServerError sends a 500 error
func InternalServerError(c *gin.Context, err string) {
	Error(c, http.StatusInternalServerError, err)
}

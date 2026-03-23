package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/stup1dbear/starthere/server/internal/middleware"
	"github.com/stup1dbear/starthere/server/internal/service"
	"github.com/stup1dbear/starthere/server/pkg/response"
)

// StarHandler handles star and check-in endpoints.
type StarHandler struct {
	starService *service.StarService
}

// NewStarHandler creates a new star handler.
func NewStarHandler(starService *service.StarService) *StarHandler {
	return &StarHandler{starService: starService}
}

// ListStars gets all stars for the authenticated user.
func (h *StarHandler) ListStars(c *gin.Context) {
	userID := middleware.GetUserID(c)

	stars, err := h.starService.ListStars(userID)
	if err != nil {
		response.InternalServerError(c, "failed to fetch stars")
		return
	}

	response.Success(c, stars)
}

// CreateStar creates a new star.
func (h *StarHandler) CreateStar(c *gin.Context) {
	userID := middleware.GetUserID(c)

	var req service.CreateStarRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request body")
		return
	}

	star, err := h.starService.CreateStar(userID, &req)
	if err != nil {
		if err.Error() == "title, vision, whyItMatters, and currentState are required" {
			response.BadRequest(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to create star")
		return
	}

	response.SuccessWithMessage(c, "Star created successfully", star)
}

// CreateCheckIn creates a new check-in for a star.
func (h *StarHandler) CreateCheckIn(c *gin.Context) {
	userID := middleware.GetUserID(c)
	starID := c.Param("starId")

	var req service.CreateStarCheckInRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request body")
		return
	}

	star, err := h.starService.CreateCheckIn(starID, userID, &req)
	if err != nil {
		switch err.Error() {
		case "mood, signal, and update are required":
			response.BadRequest(c, err.Error())
			return
		case "star not found":
			response.NotFound(c, err.Error())
			return
		default:
			response.InternalServerError(c, "failed to create check-in")
			return
		}
	}

	response.SuccessWithMessage(c, "Check-in recorded", star)
}

package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/stup1dbear/starthere/server/internal/middleware"
	"github.com/stup1dbear/starthere/server/internal/service"
	"github.com/stup1dbear/starthere/server/pkg/response"
)

// MilestoneHandler handles milestone endpoints
type MilestoneHandler struct {
	milestoneService *service.MilestoneService
}

// NewMilestoneHandler creates a new milestone handler
func NewMilestoneHandler(milestoneService *service.MilestoneService) *MilestoneHandler {
	return &MilestoneHandler{milestoneService: milestoneService}
}

// CreateMilestone creates a new milestone
func (h *MilestoneHandler) CreateMilestone(c *gin.Context) {
	userID := middleware.GetUserID(c)
	goalID := c.Param("goalId")

	var req service.CreateMilestoneRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request body")
		return
	}

	if req.Title == "" {
		response.BadRequest(c, "title is required")
		return
	}

	milestone, err := h.milestoneService.CreateMilestone(goalID, userID, &req)
	if err != nil {
		if err.Error() == "goal not found" {
			response.NotFound(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to create milestone")
		return
	}

	response.SuccessWithMessage(c, "Milestone created successfully", milestone)
}

// UpdateMilestone updates a milestone
func (h *MilestoneHandler) UpdateMilestone(c *gin.Context) {
	userID := middleware.GetUserID(c)
	goalID := c.Param("goalId")
	milestoneID := c.Param("milestoneId")

	var req service.UpdateMilestoneRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request body")
		return
	}

	if req.Title == "" {
		response.BadRequest(c, "title is required")
		return
	}

	milestone, err := h.milestoneService.UpdateMilestone(milestoneID, goalID, userID, &req)
	if err != nil {
		if err.Error() == "goal not found" || err.Error() == "milestone not found" {
			response.NotFound(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to update milestone")
		return
	}

	response.SuccessWithMessage(c, "Milestone updated successfully", milestone)
}

// ToggleMilestone toggles milestone completion
func (h *MilestoneHandler) ToggleMilestone(c *gin.Context) {
	userID := middleware.GetUserID(c)
	goalID := c.Param("goalId")
	milestoneID := c.Param("milestoneId")

	milestone, err := h.milestoneService.ToggleMilestone(milestoneID, goalID, userID)
	if err != nil {
		if err.Error() == "goal not found" || err.Error() == "milestone not found" {
			response.NotFound(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to toggle milestone")
		return
	}

	response.SuccessWithMessage(c, "Milestone updated", milestone)
}

// DeleteMilestone deletes a milestone
func (h *MilestoneHandler) DeleteMilestone(c *gin.Context) {
	userID := middleware.GetUserID(c)
	goalID := c.Param("goalId")
	milestoneID := c.Param("milestoneId")

	err := h.milestoneService.DeleteMilestone(milestoneID, goalID, userID)
	if err != nil {
		if err.Error() == "goal not found" || err.Error() == "milestone not found" {
			response.NotFound(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to delete milestone")
		return
	}

	response.SuccessWithMessage(c, "Milestone deleted successfully", nil)
}

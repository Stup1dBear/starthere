package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/stup1dbear/starthere/server/internal/middleware"
	"github.com/stup1dbear/starthere/server/internal/service"
	"github.com/stup1dbear/starthere/server/pkg/response"
)

// GoalHandler handles goal endpoints
type GoalHandler struct {
	goalService *service.GoalService
}

// NewGoalHandler creates a new goal handler
func NewGoalHandler(goalService *service.GoalService) *GoalHandler {
	return &GoalHandler{goalService: goalService}
}

// GetGoals gets all goals for the authenticated user
func (h *GoalHandler) GetGoals(c *gin.Context) {
	userID := middleware.GetUserID(c)

	goals, err := h.goalService.GetAllGoals(userID)
	if err != nil {
		response.InternalServerError(c, "failed to fetch goals")
		return
	}

	response.Success(c, goals)
}

// GetGoal gets a single goal by ID
func (h *GoalHandler) GetGoal(c *gin.Context) {
	userID := middleware.GetUserID(c)
	id := c.Param("goalId")

	goal, err := h.goalService.GetGoal(id, userID)
	if err != nil {
		response.NotFound(c, "goal not found")
		return
	}

	response.Success(c, goal)
}

// CreateGoal creates a new goal
func (h *GoalHandler) CreateGoal(c *gin.Context) {
	userID := middleware.GetUserID(c)

	var req service.CreateGoalRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request body")
		return
	}

	if req.Title == "" {
		response.BadRequest(c, "title is required")
		return
	}

	if req.Color == "" {
		req.Color = "#90caf9" // Default star blue
	}

	goal, err := h.goalService.CreateGoal(&req, userID)
	if err != nil {
		response.InternalServerError(c, "failed to create goal")
		return
	}

	response.SuccessWithMessage(c, "Goal created successfully", goal)
}

// UpdateGoal updates a goal
func (h *GoalHandler) UpdateGoal(c *gin.Context) {
	userID := middleware.GetUserID(c)
	id := c.Param("goalId")

	var req service.UpdateGoalRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request body")
		return
	}

	goal, err := h.goalService.UpdateGoal(id, &req, userID)
	if err != nil {
		if err.Error() == "goal not found" {
			response.NotFound(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to update goal")
		return
	}

	response.SuccessWithMessage(c, "Goal updated successfully", goal)
}

// ToggleGoalStatus toggles goal completion status
func (h *GoalHandler) ToggleGoalStatus(c *gin.Context) {
	userID := middleware.GetUserID(c)
	id := c.Param("goalId")

	goal, err := h.goalService.ToggleGoalStatus(id, userID)
	if err != nil {
		if err.Error() == "goal not found" {
			response.NotFound(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to toggle goal status")
		return
	}

	response.SuccessWithMessage(c, "Goal status updated", goal)
}

// DeleteGoal deletes a goal
func (h *GoalHandler) DeleteGoal(c *gin.Context) {
	userID := middleware.GetUserID(c)
	id := c.Param("goalId")

	err := h.goalService.DeleteGoal(id, userID)
	if err != nil {
		if err.Error() == "goal not found" {
			response.NotFound(c, err.Error())
			return
		}
		response.InternalServerError(c, "failed to delete goal")
		return
	}

	response.SuccessWithMessage(c, "Goal deleted successfully", nil)
}

package service

import (
	"errors"
	"time"

	"github.com/stup1dbear/starthere/server/internal/model"
	"github.com/stup1dbear/starthere/server/internal/repository"
)

// GoalService handles goal business logic
type GoalService struct {
	goalRepo *repository.GoalRepository
}

// NewGoalService creates a new goal service
func NewGoalService(goalRepo *repository.GoalRepository) *GoalService {
	return &GoalService{goalRepo: goalRepo}
}

// CreateGoalRequest represents the goal creation request
type CreateGoalRequest struct {
	Title           string   `json:"title" validate:"required"`
	Description     string   `json:"description"`
	Color           string   `json:"color" validate:"required,len=7"`
	MilestoneTitles []string `json:"milestone_titles"`
}

// UpdateGoalRequest represents the goal update request
type UpdateGoalRequest struct {
	Title       *string `json:"title"`
	Description *string `json:"description"`
	Color       *string `json:"color"`
}

// GetAllGoals gets all goals for a user
func (s *GoalService) GetAllGoals(userID string) ([]model.Goal, error) {
	return s.goalRepo.FindAllByUserID(userID)
}

// GetGoal gets a goal by ID
func (s *GoalService) GetGoal(id, userID string) (*model.Goal, error) {
	return s.goalRepo.FindByID(id, userID)
}

// CreateGoal creates a new goal
func (s *GoalService) CreateGoal(req *CreateGoalRequest, userID string) (*model.Goal, error) {
	goal := &model.Goal{
		UserID:      userID,
		Title:       req.Title,
		Description: req.Description,
		Status:      "active",
		Color:       req.Color,
	}

	// Create milestones if provided
	if len(req.MilestoneTitles) > 0 {
		for _, title := range req.MilestoneTitles {
			if title != "" {
				goal.Milestones = append(goal.Milestones, model.Milestone{
					Title:       title,
					IsCompleted: false,
				})
			}
		}
	}

	if err := s.goalRepo.Create(goal); err != nil {
		return nil, err
	}

	return goal, nil
}

// UpdateGoal updates a goal
func (s *GoalService) UpdateGoal(id string, req *UpdateGoalRequest, userID string) (*model.Goal, error) {
	// Check if goal exists
	goal, err := s.goalRepo.FindByID(id, userID)
	if err != nil {
		return nil, errors.New("goal not found")
	}

	// Update fields if provided
	if req.Title != nil {
		goal.Title = *req.Title
	}
	if req.Description != nil {
		goal.Description = *req.Description
	}
	if req.Color != nil {
		goal.Color = *req.Color
	}

	if err := s.goalRepo.Update(goal, userID); err != nil {
		return nil, err
	}

	return s.goalRepo.FindByID(id, userID)
}

// ToggleGoalStatus toggles goal status between active and completed
func (s *GoalService) ToggleGoalStatus(id, userID string) (*model.Goal, error) {
	goal, err := s.goalRepo.FindByID(id, userID)
	if err != nil {
		return nil, errors.New("goal not found")
	}

	now := timeNow()
	if goal.Status == "active" {
		goal.Status = "completed"
		goal.CompletedAt = &now
	} else {
		goal.Status = "active"
		goal.CompletedAt = nil
	}

	if err := s.goalRepo.Update(goal, userID); err != nil {
		return nil, err
	}

	return goal, nil
}

// DeleteGoal deletes a goal
func (s *GoalService) DeleteGoal(id, userID string) error {
	exists, err := s.goalRepo.Exists(id, userID)
	if err != nil {
		return err
	}
	if !exists {
		return errors.New("goal not found")
	}

	return s.goalRepo.Delete(id, userID)
}

func timeNow() int64 {
	return time.Now().UnixMilli()
}

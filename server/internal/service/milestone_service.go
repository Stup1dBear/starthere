package service

import (
	"errors"

	"github.com/stup1dbear/starthere/server/internal/model"
	"github.com/stup1dbear/starthere/server/internal/repository"
)

// MilestoneService handles milestone business logic
type MilestoneService struct {
	milestoneRepo *repository.MilestoneRepository
	goalRepo      *repository.GoalRepository
}

// NewMilestoneService creates a new milestone service
func NewMilestoneService(milestoneRepo *repository.MilestoneRepository, goalRepo *repository.GoalRepository) *MilestoneService {
	return &MilestoneService{
		milestoneRepo: milestoneRepo,
		goalRepo:      goalRepo,
	}
}

// CreateMilestoneRequest represents the milestone creation request
type CreateMilestoneRequest struct {
	Title string `json:"title" validate:"required"`
}

// UpdateMilestoneRequest represents the milestone update request
type UpdateMilestoneRequest struct {
	Title string `json:"title" validate:"required"`
}

// CreateMilestone creates a new milestone
func (s *MilestoneService) CreateMilestone(goalID, userID string, req *CreateMilestoneRequest) (*model.Milestone, error) {
	// Verify goal belongs to user
	exists, err := s.goalRepo.Exists(goalID, userID)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, errors.New("goal not found")
	}

	milestone := &model.Milestone{
		GoalID:      goalID,
		Title:       req.Title,
		IsCompleted: false,
	}

	if err := s.milestoneRepo.Create(milestone); err != nil {
		return nil, err
	}

	return milestone, nil
}

// UpdateMilestone updates a milestone
func (s *MilestoneService) UpdateMilestone(milestoneID, goalID, userID string, req *UpdateMilestoneRequest) (*model.Milestone, error) {
	// Verify goal belongs to user
	exists, err := s.goalRepo.Exists(goalID, userID)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, errors.New("goal not found")
	}

	milestone, err := s.milestoneRepo.FindByID(milestoneID)
	if err != nil {
		return nil, errors.New("milestone not found")
	}

	if milestone.GoalID != goalID {
		return nil, errors.New("milestone does not belong to this goal")
	}

	milestone.Title = req.Title
	if err := s.milestoneRepo.Update(milestone); err != nil {
		return nil, err
	}

	return milestone, nil
}

// ToggleMilestone toggles milestone completion status
func (s *MilestoneService) ToggleMilestone(milestoneID, goalID, userID string) (*model.Milestone, error) {
	// Verify goal belongs to user
	exists, err := s.goalRepo.Exists(goalID, userID)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, errors.New("goal not found")
	}

	milestone, err := s.milestoneRepo.FindByID(milestoneID)
	if err != nil {
		return nil, errors.New("milestone not found")
	}

	if milestone.GoalID != goalID {
		return nil, errors.New("milestone does not belong to this goal")
	}

	milestone.IsCompleted = !milestone.IsCompleted
	if err := s.milestoneRepo.Update(milestone); err != nil {
		return nil, err
	}

	return milestone, nil
}

// DeleteMilestone deletes a milestone
func (s *MilestoneService) DeleteMilestone(milestoneID, goalID, userID string) error {
	// Verify goal belongs to user
	exists, err := s.goalRepo.Exists(goalID, userID)
	if err != nil {
		return err
	}
	if !exists {
		return errors.New("goal not found")
	}

	milestone, err := s.milestoneRepo.FindByID(milestoneID)
	if err != nil {
		return errors.New("milestone not found")
	}

	if milestone.GoalID != goalID {
		return errors.New("milestone does not belong to this goal")
	}

	return s.milestoneRepo.Delete(milestoneID)
}

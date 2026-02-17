package repository

import (
	"github.com/google/uuid"
	"github.com/stup1dbear/starthere/server/internal/model"
	"gorm.io/gorm"
)

// GoalRepository handles database operations for goals
type GoalRepository struct {
	db *gorm.DB
}

// NewGoalRepository creates a new goal repository
func NewGoalRepository(db *gorm.DB) *GoalRepository {
	return &GoalRepository{db: db}
}

// Create creates a new goal
func (r *GoalRepository) Create(goal *model.Goal) error {
	goal.ID = uuid.NewString()
	return r.db.Create(goal).Error
}

// FindByID finds a goal by ID
func (r *GoalRepository) FindByID(id, userID string) (*model.Goal, error) {
	var goal model.Goal
	err := r.db.Preload("Milestones").Where("id = ? AND user_id = ?", id, userID).First(&goal).Error
	if err != nil {
		return nil, err
	}
	return &goal, nil
}

// FindAllByUserID finds all goals for a user
func (r *GoalRepository) FindAllByUserID(userID string) ([]model.Goal, error) {
	var goals []model.Goal
	err := r.db.Preload("Milestones").Where("user_id = ?", userID).Order("created_at DESC").Find(&goals).Error
	return goals, err
}

// Update updates a goal
func (r *GoalRepository) Update(goal *model.Goal, userID string) error {
	return r.db.Model(&model.Goal{}).Where("id = ? AND user_id = ?", goal.ID, userID).Updates(map[string]interface{}{
		"title":        goal.Title,
		"description":  goal.Description,
		"color":        goal.Color,
		"status":       goal.Status,
		"completed_at": goal.CompletedAt,
	}).Error
}

// Delete deletes a goal
func (r *GoalRepository) Delete(id, userID string) error {
	return r.db.Where("id = ? AND user_id = ?", id, userID).Delete(&model.Goal{}).Error
}

// Exists checks if a goal exists for a user
func (r *GoalRepository) Exists(id, userID string) (bool, error) {
	var count int64
	err := r.db.Model(&model.Goal{}).Where("id = ? AND user_id = ?", id, userID).Count(&count).Error
	return count > 0, err
}

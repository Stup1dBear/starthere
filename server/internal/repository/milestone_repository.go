package repository

import (
	"github.com/google/uuid"
	"github.com/stup1dbear/starthere/server/internal/model"
	"gorm.io/gorm"
)

// MilestoneRepository handles database operations for milestones
type MilestoneRepository struct {
	db *gorm.DB
}

// NewMilestoneRepository creates a new milestone repository
func NewMilestoneRepository(db *gorm.DB) *MilestoneRepository {
	return &MilestoneRepository{db: db}
}

// Create creates a new milestone
func (r *MilestoneRepository) Create(milestone *model.Milestone) error {
	milestone.ID = uuid.NewString()
	return r.db.Create(milestone).Error
}

// FindByID finds a milestone by ID
func (r *MilestoneRepository) FindByID(id string) (*model.Milestone, error) {
	var milestone model.Milestone
	err := r.db.Where("id = ?", id).First(&milestone).Error
	if err != nil {
		return nil, err
	}
	return &milestone, nil
}

// FindByGoalID finds all milestones for a goal
func (r *MilestoneRepository) FindByGoalID(goalID string) ([]model.Milestone, error) {
	var milestones []model.Milestone
	err := r.db.Where("goal_id = ?", goalID).Order("created_at ASC").Find(&milestones).Error
	return milestones, err
}

// Update updates a milestone
func (r *MilestoneRepository) Update(milestone *model.Milestone) error {
	return r.db.Model(&model.Milestone{}).Where("id = ?", milestone.ID).Updates(map[string]interface{}{
		"title":        milestone.Title,
		"is_completed": milestone.IsCompleted,
	}).Error
}

// Delete deletes a milestone
func (r *MilestoneRepository) Delete(id string) error {
	return r.db.Where("id = ?", id).Delete(&model.Milestone{}).Error
}

package repository

import (
	"github.com/google/uuid"
	"github.com/stup1dbear/starthere/server/internal/model"
	"gorm.io/gorm"
)

// StarRepository handles database operations for stars and their check-ins.
type StarRepository struct {
	db *gorm.DB
}

// NewStarRepository creates a new star repository.
func NewStarRepository(db *gorm.DB) *StarRepository {
	return &StarRepository{db: db}
}

// FindAllByUserID finds all stars for a user with recent check-ins.
func (r *StarRepository) FindAllByUserID(userID string) ([]model.Star, error) {
	var stars []model.Star
	err := r.db.
		Preload("CheckIns", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at DESC")
		}).
		Where("user_id = ?", userID).
		Order("updated_at DESC").
		Find(&stars).Error
	return stars, err
}

// FindByID finds a star by ID for a user.
func (r *StarRepository) FindByID(id, userID string) (*model.Star, error) {
	var star model.Star
	err := r.db.
		Preload("CheckIns", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at DESC")
		}).
		Where("id = ? AND user_id = ?", id, userID).
		First(&star).Error
	if err != nil {
		return nil, err
	}
	return &star, nil
}

// Create creates a new star.
func (r *StarRepository) Create(star *model.Star) error {
	star.ID = uuid.NewString()
	return r.db.Create(star).Error
}

// Update updates a star record.
func (r *StarRepository) Update(star *model.Star, userID string) error {
	return r.db.Model(&model.Star{}).
		Where("id = ? AND user_id = ?", star.ID, userID).
		Updates(map[string]interface{}{
			"vision":           star.Vision,
			"why_it_matters":   star.WhyItMatters,
			"current_state":    star.CurrentState,
			"last_check_in_at": star.LastCheckInAt,
			"momentum":         star.Momentum,
			"energy":           star.Energy,
			"status":           star.Status,
			"next_step":        star.NextStep,
			"updated_at":       star.UpdatedAt,
		}).Error
}

// CreateCheckIn creates a new check-in for a star.
func (r *StarRepository) CreateCheckIn(checkIn *model.StarCheckIn) error {
	checkIn.ID = uuid.NewString()
	return r.db.Create(checkIn).Error
}

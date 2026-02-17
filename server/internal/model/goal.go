package model

// Goal represents the goal model
type Goal struct {
	ID          string      `json:"id" gorm:"primaryKey;type:varchar(36)"`
	UserID      string      `json:"user_id" gorm:"type:varchar(36);index;not null"`
	Title       string      `json:"title" gorm:"type:varchar(255);not null"`
	Description string      `json:"description" gorm:"type:text"`
	Status      string      `json:"status" gorm:"type:varchar(20);default:'active';index"`
	Color       string      `json:"color" gorm:"type:varchar(7);not null"`
	CreatedAt   int64       `json:"created_at" gorm:"autoCreateTime:milli"`
	CompletedAt *int64      `json:"completed_at,omitempty"`
	Milestones  []Milestone `json:"milestones,omitempty" gorm:"foreignKey:GoalID;constraint:OnDelete:CASCADE"`
}

// TableName specifies the table name
func (Goal) TableName() string {
	return "goals"
}

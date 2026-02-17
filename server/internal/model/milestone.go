package model

// Milestone represents the milestone model
type Milestone struct {
	ID          string `json:"id" gorm:"primaryKey;type:varchar(36)"`
	GoalID      string `json:"goal_id" gorm:"type:varchar(36);index;not null"`
	Title       string `json:"title" gorm:"type:varchar(255);not null"`
	IsCompleted bool   `json:"is_completed" gorm:"default:false"`
	CreatedAt   int64  `json:"created_at" gorm:"autoCreateTime:milli"`
}

// TableName specifies the table name
func (Milestone) TableName() string {
	return "milestones"
}

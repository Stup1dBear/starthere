package model

// User represents the user model
type User struct {
	ID                string  `json:"id" gorm:"primaryKey;type:varchar(36)"`
	Username          string  `json:"username" gorm:"type:varchar(50);uniqueIndex;not null"`
	Email             string  `json:"email" gorm:"type:varchar(100);uniqueIndex;not null"`
	PasswordHash      string  `json:"-" gorm:"type:varchar(255);not null"`
	IsVerified        bool    `json:"is_verified" gorm:"default:false"`
	VerificationToken *string `json:"-" gorm:"type:varchar(255);index"`
	VerificationSentAt *int64 `json:"-"`
	VerifiedAt        *int64  `json:"verified_at,omitempty"`
	CreatedAt         int64   `json:"created_at" gorm:"autoCreateTime:milli"`
	UpdatedAt         int64   `json:"updated_at" gorm:"autoUpdateTime:milli"`
}

// TableName specifies the table name
func (User) TableName() string {
	return "users"
}

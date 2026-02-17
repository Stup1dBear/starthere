package model

// User represents the user model
type User struct {
	ID           string `json:"id" gorm:"primaryKey;type:varchar(36)"`
	Username     string `json:"username" gorm:"type:varchar(50);uniqueIndex;not null"`
	Email        string `json:"email" gorm:"type:varchar(100);uniqueIndex;not null"`
	PasswordHash string `json:"-" gorm:"type:varchar(255);not null"`
	CreatedAt    int64  `json:"created_at" gorm:"autoCreateTime:milli"`
	UpdatedAt    int64  `json:"updated_at" gorm:"autoUpdateTime:milli"`
}

// TableName specifies the table name
func (User) TableName() string {
	return "users"
}

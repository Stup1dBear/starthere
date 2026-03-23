package model

// AssistantReply represents the deterministic companion reply stored with a check-in.
type AssistantReply struct {
	Title      string `json:"title"`
	Message    string `json:"message"`
	Reflection string `json:"reflection"`
	NextStep   string `json:"nextStep"`
}

// StarCheckIn represents a single exploration update for a star.
type StarCheckIn struct {
	ID             string         `json:"id" gorm:"primaryKey;type:varchar(36)"`
	StarID         string         `json:"starId" gorm:"column:star_id;type:varchar(36);index;not null"`
	CreatedAt      int64          `json:"createdAt" gorm:"column:created_at;autoCreateTime:milli"`
	Mood           string         `json:"mood" gorm:"type:varchar(20);not null"`
	Signal         string         `json:"signal" gorm:"column:check_in_signal;type:varchar(20);not null"`
	Update         string         `json:"update" gorm:"column:update_text;type:text;not null"`
	Blocker        string         `json:"blocker" gorm:"type:text"`
	NextStep       string         `json:"nextStep" gorm:"column:next_step;type:text;not null"`
	CompanionReply AssistantReply `json:"companionReply" gorm:"embedded;embeddedPrefix:reply_"`
}

// TableName specifies the table name.
func (StarCheckIn) TableName() string {
	return "star_check_ins"
}

// Star represents a long-term personal project in the new MVP model.
type Star struct {
	ID            string        `json:"id" gorm:"primaryKey;type:varchar(36)"`
	UserID        string        `json:"userId" gorm:"column:user_id;type:varchar(36);index;not null"`
	Title         string        `json:"title" gorm:"type:varchar(255);not null"`
	Vision        string        `json:"vision" gorm:"type:text;not null"`
	WhyItMatters  string        `json:"whyItMatters" gorm:"column:why_it_matters;type:text;not null"`
	CurrentState  string        `json:"currentState" gorm:"column:current_state;type:text;not null"`
	Color         string        `json:"color" gorm:"type:varchar(7);not null"`
	CreatedAt     int64         `json:"createdAt" gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt     int64         `json:"updatedAt" gorm:"column:updated_at;autoUpdateTime:milli"`
	LastCheckInAt *int64        `json:"lastCheckInAt,omitempty" gorm:"column:last_check_in_at"`
	Momentum      string        `json:"momentum" gorm:"type:varchar(20);not null"`
	Energy        int           `json:"energy" gorm:"not null"`
	Status        string        `json:"status" gorm:"type:varchar(20);not null;index"`
	NextStep      string        `json:"nextStep" gorm:"column:next_step;type:text;not null"`
	CheckIns      []StarCheckIn `json:"checkIns,omitempty" gorm:"foreignKey:StarID;constraint:OnDelete:CASCADE"`
}

// TableName specifies the table name.
func (Star) TableName() string {
	return "stars"
}

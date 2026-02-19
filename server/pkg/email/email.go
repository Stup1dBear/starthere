package email

import "errors"

// Emailer defines the interface for sending emails
type Emailer interface {
	Send(to, subject, htmlBody string) error
}

// Config holds email configuration
type Config struct {
	Driver         string // "smtp" or "log" (log only prints to console)
	FromAddress    string
	FromName       string

	// SMTP configuration
	SMTPHost string
	SMTPPort string
	SMTPUser string
	SMTPPass string
}

// NewEmailer creates a new emailer based on configuration
func NewEmailer(cfg *Config) (Emailer, error) {
	switch cfg.Driver {
	case "smtp":
		if cfg.SMTPHost == "" || cfg.SMTPPort == "" {
			return nil, errors.New("SMTP host and port are required")
		}
		return NewSMTPEmailer(cfg), nil
	case "log":
		fallthrough
	default:
		return NewLogEmailer(), nil
	}
}

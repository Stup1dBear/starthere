package email

import "log"

// LogEmailer prints emails to console instead of sending them
type LogEmailer struct{}

// NewLogEmailer creates a new log emailer
func NewLogEmailer() *LogEmailer {
	return &LogEmailer{}
}

// Send prints the email to log
func (e *LogEmailer) Send(to, subject, htmlBody string) error {
	log.Println("========================================")
	log.Println("📧 EMAIL WOULD BE SENT (LOG MODE)")
	log.Println("To:", to)
	log.Println("Subject:", subject)
	log.Println("Body:", htmlBody)
	log.Println("========================================")
	return nil
}

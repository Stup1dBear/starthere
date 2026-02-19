package email

import (
	"crypto/tls"
	"fmt"
	"net/smtp"
)

// SMTPEmailer sends emails via SMTP
type SMTPEmailer struct {
	cfg *Config
}

// NewSMTPEmailer creates a new SMTP emailer
func NewSMTPEmailer(cfg *Config) *SMTPEmailer {
	return &SMTPEmailer{cfg: cfg}
}

// Send sends an email via SMTP
func (e *SMTPEmailer) Send(to, subject, htmlBody string) error {
	// Build email headers
	fromHeader := e.cfg.FromAddress
	if e.cfg.FromName != "" {
		fromHeader = fmt.Sprintf("%s <%s>", e.cfg.FromName, e.cfg.FromAddress)
	}

	headers := make(map[string]string)
	headers["From"] = fromHeader
	headers["To"] = to
	headers["Subject"] = subject
	headers["MIME-Version"] = "1.0"
	headers["Content-Type"] = "text/html; charset=\"UTF-8\""

	// Build message
	message := ""
	for k, v := range headers {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + htmlBody

	// Connect to SMTP server
	addr := fmt.Sprintf("%s:%s", e.cfg.SMTPHost, e.cfg.SMTPPort)
	auth := smtp.PlainAuth("", e.cfg.SMTPUser, e.cfg.SMTPPass, e.cfg.SMTPHost)

	// Use TLS if port is 465
	if e.cfg.SMTPPort == "465" {
		return e.sendWithTLS(addr, auth, e.cfg.FromAddress, to, message)
	}

	// Use STARTTLS for other ports (587, etc.)
	return smtp.SendMail(addr, auth, e.cfg.FromAddress, []string{to}, []byte(message))
}

func (e *SMTPEmailer) sendWithTLS(addr string, auth smtp.Auth, from, to, message string) error {
	// Dial TLS connection
	conn, err := tls.Dial("tcp", addr, &tls.Config{
		InsecureSkipVerify: false,
		ServerName:         e.cfg.SMTPHost,
	})
	if err != nil {
		return err
	}
	defer conn.Close()

	// Create SMTP client
	client, err := smtp.NewClient(conn, e.cfg.SMTPHost)
	if err != nil {
		return err
	}
	defer client.Close()

	// Auth
	if err = client.Auth(auth); err != nil {
		return err
	}

	// From
	if err = client.Mail(from); err != nil {
		return err
	}

	// To
	if err = client.Rcpt(to); err != nil {
		return err
	}

	// Data
	w, err := client.Data()
	if err != nil {
		return err
	}
	_, err = w.Write([]byte(message))
	if err != nil {
		return err
	}
	err = w.Close()
	if err != nil {
		return err
	}

	return client.Quit()
}

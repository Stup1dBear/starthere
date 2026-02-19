package email

import (
	"strings"
	"testing"
)

// TestNewEmailer tests the NewEmailer function
func TestNewEmailer(t *testing.T) {
	tests := []struct {
		name        string
		config      *Config
		wantErr     bool
		checkDriver func(t *testing.T, e Emailer)
	}{
		{
			name: "log driver",
			config: &Config{
				Driver: "log",
			},
			wantErr: false,
			checkDriver: func(t *testing.T, e Emailer) {
				if _, ok := e.(*LogEmailer); !ok {
					t.Errorf("expected *LogEmailer, got %T", e)
				}
			},
		},
		{
			name: "default driver is log",
			config: &Config{
				Driver: "",
			},
			wantErr: false,
			checkDriver: func(t *testing.T, e Emailer) {
				if _, ok := e.(*LogEmailer); !ok {
					t.Errorf("expected *LogEmailer, got %T", e)
				}
			},
		},
		{
			name: "smtp driver with full config",
			config: &Config{
				Driver:     "smtp",
				SMTPHost:   "smtp.example.com",
				SMTPPort:   "587",
				SMTPUser:   "user",
				SMTPPass:   "pass",
				FromAddress: "test@example.com",
				FromName:    "Test",
			},
			wantErr: false,
			checkDriver: func(t *testing.T, e Emailer) {
				if _, ok := e.(*SMTPEmailer); !ok {
					t.Errorf("expected *SMTPEmailer, got %T", e)
				}
			},
		},
		{
			name: "smtp driver missing host",
			config: &Config{
				Driver:   "smtp",
				SMTPPort: "587",
			},
			wantErr: true,
		},
		{
			name: "smtp driver missing port",
			config: &Config{
				Driver:   "smtp",
				SMTPHost: "smtp.example.com",
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			emailer, err := NewEmailer(tt.config)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewEmailer() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr && tt.checkDriver != nil {
				tt.checkDriver(t, emailer)
			}
		})
	}
}

// TestLogEmailer_Send tests the LogEmailer Send method
func TestLogEmailer_Send(t *testing.T) {
	emailer := NewLogEmailer()

	err := emailer.Send("test@example.com", "Test Subject", "<p>Test Body</p>")
	if err != nil {
		t.Errorf("LogEmailer.Send() error = %v", err)
	}
}

// TestVerificationEmailTemplate tests the VerificationEmailTemplate function
func TestVerificationEmailTemplate(t *testing.T) {
	testURL := "https://example.com/verify?token=abc123"
	html := VerificationEmailTemplate(testURL)

	// Check that the template contains the URL
	if !strings.Contains(html, testURL) {
		t.Errorf("VerificationEmailTemplate() should contain URL %q, but doesn't", testURL)
	}

	// Check that the template has expected content
	expectedStrings := []string{
		"邮箱验证",
		"验证邮箱",
		"24 小时",
	}
	for _, s := range expectedStrings {
		if !strings.Contains(html, s) {
			t.Errorf("VerificationEmailTemplate() should contain %q, but doesn't", s)
		}
	}

	// Check that URL appears twice (button + text)
	count := strings.Count(html, testURL)
	if count != 2 {
		t.Errorf("VerificationEmailTemplate() should contain URL %d times, but got %d", 2, count)
	}
}

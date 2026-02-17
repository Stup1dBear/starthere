package database

import (
	"log"
	"time"

	"github.com/stup1dbear/starthere/server/internal/config"
	"github.com/stup1dbear/starthere/server/internal/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// DB is the global database connection
var DB *gorm.DB

// Connect connects to the database
func Connect(cfg *config.DatabaseConfig) error {
	var err error

	// Configure GORM
	gormConfig := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	}

	// Retry connection a few times
	for i := 0; i < 10; i++ {
		DB, err = gorm.Open(mysql.Open(cfg.DSN()), gormConfig)
		if err == nil {
			break
		}
		log.Printf("Failed to connect to database (attempt %d/10): %v", i+1, err)
		time.Sleep(2 * time.Second)
	}

	if err != nil {
		return err
	}

	// Configure connection pool
	sqlDB, err := DB.DB()
	if err != nil {
		return err
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	log.Println("Database connected successfully")
	return nil
}

// AutoMigrate runs database migrations
func AutoMigrate() error {
	return DB.AutoMigrate(
		&model.User{},
		&model.Goal{},
		&model.Milestone{},
	)
}

package main

import (
	"database/sql"
	"errors"
	"log"
	"os"
	"path/filepath"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/stup1dbear/starthere/server/internal/config"
)

const migrationsTable = "schema_migrations"

func main() {
	if len(os.Args) < 2 {
		log.Fatalf("usage: migrate <up|down|version|force|baseline> [arg]")
	}

	cfg := config.Load()
	db, err := sql.Open("mysql", cfg.Database.DSN())
	if err != nil {
		log.Fatalf("failed to open database: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	migrationsDir, err := filepath.Abs(getEnv("MIGRATIONS_DIR", "./migrations"))
	if err != nil {
		log.Fatalf("failed to resolve migrations dir: %v", err)
	}

	driver, err := mysql.WithInstance(db, &mysql.Config{
		MigrationsTable: migrationsTable,
	})
	if err != nil {
		log.Fatalf("failed to initialize migration driver: %v", err)
	}

	m, err := migrate.NewWithDatabaseInstance("file://"+migrationsDir, "mysql", driver)
	if err != nil {
		log.Fatalf("failed to initialize migrations: %v", err)
	}

	switch os.Args[1] {
	case "up":
		if err := guardManagedState(db); err != nil {
			log.Fatal(err)
		}
		if err := m.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
			log.Fatalf("migration up failed: %v", err)
		}
		log.Println("migration up completed")
	case "down":
		if err := m.Steps(-1); err != nil && !errors.Is(err, migrate.ErrNoChange) {
			log.Fatalf("migration down failed: %v", err)
		}
		log.Println("migration down completed")
	case "version":
		version, dirty, err := m.Version()
		if errors.Is(err, migrate.ErrNilVersion) {
			log.Println("migration version: nil (no migrations applied)")
			return
		}
		if err != nil {
			log.Fatalf("failed to read migration version: %v", err)
		}
		log.Printf("migration version: %d (dirty=%t)\n", version, dirty)
	case "force":
		version := requiredVersionArg(os.Args)
		if err := m.Force(version); err != nil {
			log.Fatalf("failed to force migration version: %v", err)
		}
		log.Printf("forced migration version to %d\n", version)
	case "baseline":
		version := requiredVersionArg(os.Args)
		if err := m.Force(version); err != nil {
			log.Fatalf("failed to baseline migration version: %v", err)
		}
		log.Printf("baselined migration version to %d\n", version)
	default:
		log.Fatalf("unsupported command: %s", os.Args[1])
	}
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func requiredVersionArg(args []string) int {
	if len(args) < 3 {
		log.Fatal("version argument is required")
	}
	version, err := strconv.Atoi(args[2])
	if err != nil {
		log.Fatalf("invalid version: %v", err)
	}
	return version
}

func guardManagedState(db *sql.DB) error {
	hasMigrationsTable, err := tableExists(db, migrationsTable)
	if err != nil {
		return err
	}
	if hasMigrationsTable {
		return nil
	}

	hasUserTables, err := existingAppTables(db)
	if err != nil {
		return err
	}
	if hasUserTables {
		return errors.New("database already has application tables but is not baseline-managed; run 'go run ./cmd/migrate baseline 1' after verifying the schema matches migration 001")
	}
	return nil
}

func existingAppTables(db *sql.DB) (bool, error) {
	for _, table := range []string{"users", "goals", "milestones"} {
		exists, err := tableExists(db, table)
		if err != nil {
			return false, err
		}
		if exists {
			return true, nil
		}
	}
	return false, nil
}

func tableExists(db *sql.DB, table string) (bool, error) {
	var count int
	if err := db.QueryRow(
		"SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?",
		table,
	).Scan(&count); err != nil {
		return false, err
	}
	return count > 0, nil
}

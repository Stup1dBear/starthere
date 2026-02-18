package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/stup1dbear/starthere/server/internal/config"
	"github.com/stup1dbear/starthere/server/internal/handler"
	"github.com/stup1dbear/starthere/server/internal/middleware"
	"github.com/stup1dbear/starthere/server/internal/repository"
	"github.com/stup1dbear/starthere/server/internal/service"
	"github.com/stup1dbear/starthere/server/pkg/database"
	"github.com/stup1dbear/starthere/server/pkg/jwt"
	"github.com/stup1dbear/starthere/server/pkg/response"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Set gin mode
	gin.SetMode(cfg.Server.GinMode)

	// Initialize router
	r := gin.Default()

	// CORS middleware
	r.Use(middleware.CORS())

	// Health check handler
	healthHandler := func(c *gin.Context) {
		response.Success(c, gin.H{
			"status": "ok",
		})
	}

	// Health check endpoints (support both GET and HEAD)
	r.GET("/health", healthHandler)
	r.HEAD("/health", healthHandler)

	// Connect to database
	if err := database.Connect(&cfg.Database); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Auto migrate database
	if err := database.AutoMigrate(); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Initialize JWT manager
	jwtManager := jwt.NewManager(cfg.JWT.SecretKey, cfg.JWT.ExpiryHours)

	// Initialize repositories
	userRepo := repository.NewUserRepository(database.DB)
	goalRepo := repository.NewGoalRepository(database.DB)
	milestoneRepo := repository.NewMilestoneRepository(database.DB)

	// Initialize services
	authService := service.NewAuthService(userRepo, jwtManager)
	goalService := service.NewGoalService(goalRepo)
	milestoneService := service.NewMilestoneService(milestoneRepo, goalRepo)

	// Initialize handlers
	authHandler := handler.NewAuthHandler(authService)
	goalHandler := handler.NewGoalHandler(goalService)
	milestoneHandler := handler.NewMilestoneHandler(milestoneService)

	// Initialize middleware
	authMiddleware := middleware.NewAuthMiddleware(jwtManager)

	// API routes
	api := r.Group("/api/v1")
	{
		// Health check (public, no auth required)
		api.GET("/health", healthHandler)
		api.HEAD("/health", healthHandler)

		// Auth routes (public)
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
		}

		// Protected routes
		protected := api.Group("")
		protected.Use(authMiddleware.RequireAuth())
		{
			// Auth
			protected.GET("/auth/me", authHandler.Me)

			// Goals
			goals := protected.Group("/goals")
			{
				goals.GET("", goalHandler.GetGoals)
				goals.POST("", goalHandler.CreateGoal)
				goals.GET("/:goalId", goalHandler.GetGoal)
				goals.PUT("/:goalId", goalHandler.UpdateGoal)
				goals.DELETE("/:goalId", goalHandler.DeleteGoal)
				goals.PATCH("/:goalId/toggle", goalHandler.ToggleGoalStatus)

				// Milestones
				milestones := goals.Group("/:goalId/milestones")
				{
					milestones.POST("", milestoneHandler.CreateMilestone)
					milestones.PUT("/:milestoneId", milestoneHandler.UpdateMilestone)
					milestones.DELETE("/:milestoneId", milestoneHandler.DeleteMilestone)
					milestones.PATCH("/:milestoneId/toggle", milestoneHandler.ToggleMilestone)
				}
			}
		}
	}

	// Start server
	log.Printf("Server starting on port %s", cfg.Server.Port)
	if err := r.Run(":" + cfg.Server.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

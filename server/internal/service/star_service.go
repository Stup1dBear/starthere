package service

import (
	"errors"
	"strings"
	"time"

	"github.com/stup1dbear/starthere/server/internal/model"
	"github.com/stup1dbear/starthere/server/internal/repository"
)

// StarService handles the assistant-first MVP star loop.
type StarService struct {
	starRepo *repository.StarRepository
}

// NewStarService creates a new star service.
func NewStarService(starRepo *repository.StarRepository) *StarService {
	return &StarService{starRepo: starRepo}
}

// CreateStarRequest represents the star creation request.
type CreateStarRequest struct {
	Title        string `json:"title"`
	Vision       string `json:"vision"`
	WhyItMatters string `json:"whyItMatters"`
	CurrentState string `json:"currentState"`
}

// CreateStarCheckInRequest represents a check-in submission.
type CreateStarCheckInRequest struct {
	Mood    string `json:"mood"`
	Signal  string `json:"signal"`
	Update  string `json:"update"`
	Blocker string `json:"blocker"`
}

// ListStars gets all stars for a user.
func (s *StarService) ListStars(userID string) ([]model.Star, error) {
	return s.starRepo.FindAllByUserID(userID)
}

// CreateStar creates a new star.
func (s *StarService) CreateStar(userID string, req *CreateStarRequest) (*model.Star, error) {
	req.Title = strings.TrimSpace(req.Title)
	req.Vision = strings.TrimSpace(req.Vision)
	req.WhyItMatters = strings.TrimSpace(req.WhyItMatters)
	req.CurrentState = strings.TrimSpace(req.CurrentState)

	if req.Title == "" || req.Vision == "" || req.WhyItMatters == "" || req.CurrentState == "" {
		return nil, errors.New("title, vision, whyItMatters, and currentState are required")
	}

	star := &model.Star{
		UserID:       userID,
		Title:        req.Title,
		Vision:       req.Vision,
		WhyItMatters: req.WhyItMatters,
		CurrentState: req.CurrentState,
		Color:        getRandomStarColor(req.Title),
		Momentum:     "forming",
		Energy:       52,
		Status:       "active",
		NextStep:     "先做一件最小但真实的开始动作。",
	}

	if err := s.starRepo.Create(star); err != nil {
		return nil, err
	}

	return s.starRepo.FindByID(star.ID, userID)
}

// CreateCheckIn creates a new check-in and updates the star snapshot.
func (s *StarService) CreateCheckIn(starID, userID string, req *CreateStarCheckInRequest) (*model.Star, error) {
	req.Mood = strings.TrimSpace(req.Mood)
	req.Signal = strings.TrimSpace(req.Signal)
	req.Update = strings.TrimSpace(req.Update)
	req.Blocker = strings.TrimSpace(req.Blocker)

	if req.Mood == "" || req.Signal == "" || req.Update == "" {
		return nil, errors.New("mood, signal, and update are required")
	}

	star, err := s.starRepo.FindByID(starID, userID)
	if err != nil {
		return nil, errors.New("star not found")
	}

	reply := generateCompanionReply(star.Title, req.Mood, req.Signal, req.Update, req.Blocker)
	now := time.Now().UnixMilli()
	checkIn := &model.StarCheckIn{
		StarID:    star.ID,
		Mood:      req.Mood,
		Signal:    req.Signal,
		Update:    req.Update,
		Blocker:   req.Blocker,
		NextStep:  reply.NextStep,
		CreatedAt: now,
		CompanionReply: model.AssistantReply{
			Title:      reply.Title,
			Message:    reply.Message,
			Reflection: reply.Reflection,
			NextStep:   reply.NextStep,
		},
	}

	if err := s.starRepo.CreateCheckIn(checkIn); err != nil {
		return nil, err
	}

	star.CurrentState = req.Update
	star.NextStep = reply.NextStep
	star.Momentum = computeMomentum(req.Signal)
	star.Energy = computeEnergy(req.Signal, req.Mood)
	star.LastCheckInAt = &now
	star.UpdatedAt = now

	if err := s.starRepo.Update(star, userID); err != nil {
		return nil, err
	}

	return s.starRepo.FindByID(star.ID, userID)
}

func getRandomStarColor(seed string) string {
	colors := []string{
		"#FFD700",
		"#87CEEB",
		"#FFB347",
		"#9FE2BF",
		"#FF8DA1",
		"#A5B4FF",
		"#E0FFFF",
	}
	sum := 0
	for _, char := range seed {
		sum += int(char)
	}
	return colors[sum%len(colors)]
}

type companionReply struct {
	Title      string
	Message    string
	Reflection string
	NextStep   string
}

func generateCompanionReply(starTitle, mood, signal, update, blocker string) companionReply {
	return companionReply{
		Title:      signalTitle(signal),
		Message:    moodLabel(mood) + "。关于「" + starTitle + "」，我更在意你能不能顺着现在的状态继续往前一点。",
		Reflection: buildReflection(signal, blocker),
		NextStep:   buildNextStep(signal, update, blocker),
	}
}

func signalTitle(signal string) string {
	switch signal {
	case "progress":
		return "轨道正在推进"
	case "drift":
		return "星轨有点偏了"
	case "blocked":
		return "前方有一小片陨石带"
	case "returning":
		return "欢迎回来"
	default:
		return "继续靠近这颗星"
	}
}

func moodLabel(mood string) string {
	switch mood {
	case "clear":
		return "你现在是清晰的"
	case "hopeful":
		return "你现在是带着希望的"
	case "foggy":
		return "你现在有点雾蒙蒙的"
	case "stuck":
		return "你现在是卡住的"
	case "tired":
		return "你现在有点累了"
	case "energized":
		return "你现在是有推进感的"
	default:
		return "你现在正在重新观察自己的状态"
	}
}

func buildReflection(signal, blocker string) string {
	switch {
	case signal == "progress":
		return "先把已经发生的推进看清楚，比急着加码更重要。"
	case signal == "returning":
		return "这次最重要的不是补齐所有缺口，而是重新和这颗星建立连接。"
	case signal == "blocked" && blocker != "":
		return "现在真正挡在前面的不是整条路，而是「" + blocker + "」这一段。"
	case signal == "drift":
		return "漂移不等于放弃，通常只是连接断了一阵子。"
	default:
		return "先把阻力缩小到一个具体问题，路会更容易出现。"
	}
}

func buildNextStep(signal, update, blocker string) string {
	switch {
	case signal == "progress":
		return "把刚推进的内容整理成一个 20 分钟内能继续的最小动作。"
	case signal == "returning":
		return "花 10 分钟重读现状，然后只做第一件能恢复手感的小事。"
	case signal == "blocked" && blocker != "":
		return "只处理「" + blocker + "」里最小、最能验证方向的一步。"
	case len(update) > 80:
		return "把这次更新压缩成一句话，再从里面挑出今天唯一要推进的动作。"
	default:
		return "先定义一个可以在今天完成的下一步，不求完整，只求恢复连续性。"
	}
}

func computeMomentum(signal string) string {
	switch signal {
	case "progress":
		return "steady"
	case "returning":
		return "renewing"
	case "drift":
		return "drifting"
	case "blocked":
		return "forming"
	default:
		return "forming"
	}
}

func computeEnergy(signal, mood string) int {
	baseBySignal := map[string]int{
		"progress":  78,
		"returning": 60,
		"drift":     42,
		"blocked":   35,
	}
	moodAdjustment := map[string]int{
		"clear":     8,
		"hopeful":   5,
		"foggy":     -8,
		"stuck":     -12,
		"tired":     -10,
		"energized": 10,
	}

	base := baseBySignal[signal]
	if mood == "energized" {
		base = baseBySignal["progress"]
	}
	energy := base + moodAdjustment[mood]
	if energy < 10 {
		return 10
	}
	if energy > 95 {
		return 95
	}
	return energy
}

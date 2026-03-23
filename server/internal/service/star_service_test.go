package service

import "testing"

func TestGenerateCompanionReply(t *testing.T) {
	reply := generateCompanionReply("Ship StartHere MVP", "foggy", "returning", "I want to come back", "")
	if reply.Title != "欢迎回来" {
		t.Fatalf("expected returning title, got %q", reply.Title)
	}
	if reply.NextStep == "" {
		t.Fatal("expected next step to be generated")
	}
}

func TestBuildNextStepForBlockedState(t *testing.T) {
	nextStep := buildNextStep("blocked", "Need to focus the homepage", "首页信息太散")
	if nextStep != "只处理「首页信息太散」里最小、最能验证方向的一步。" {
		t.Fatalf("unexpected next step: %q", nextStep)
	}
}

func TestComputeEnergyRange(t *testing.T) {
	if energy := computeEnergy("blocked", "stuck"); energy < 10 || energy > 95 {
		t.Fatalf("energy out of range: %d", energy)
	}
	if energy := computeEnergy("progress", "energized"); energy < 10 || energy > 95 {
		t.Fatalf("energy out of range: %d", energy)
	}
}

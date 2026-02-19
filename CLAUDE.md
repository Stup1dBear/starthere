# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**StartHere (星辰目标管理)** - A goal management application where each goal is represented as a star in the universe. When completed, the star is illuminated.

- **GitHub**: https://github.com/Stup1dBear/starthere
- **Live URL**: https://star-there.com (https enabled via ALB with SNI multi-certificate)
- **Developer Background**: Backend/Infrastructure engineer learning frontend development (React + TypeScript)

---

## Development Commands

### Frontend (web/)

```bash
cd web
npm install          # Install dependencies
npm run dev          # Start dev server (Vite)
npm run build        # Build for production (tsc + vite build)
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Docker

```bash
# Build multi-platform image (for Mac M1 building for AMD64 server)
docker build --platform linux/amd64 -t starthere/web ./web

# Using docker-compose
docker-compose up -d              # Start services
docker-compose down              # Stop services
docker-compose logs web          # View web logs
```

### CI/CD

- Push to `main` branch triggers automatic deployment via GitHub Actions
- Manual trigger: GitHub → Actions → Deploy to Production → Run workflow
- Required GitHub Secrets: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_KEY`

---

## Architecture

```
starthere/
├── web/                    # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (GoalCard, CreateGoalDialog, StarBackground)
│   │   ├── stores/         # Zustand state management (goalStore.ts - uses localStorage persistence)
│   │   ├── types/          # TypeScript interfaces (Goal, Milestone)
│   │   ├── theme/          # MUI theme configuration (dark mode, space theme)
│   │   ├── utils/          # Helper functions (generateId, getRandomColor)
│   │   └── App.tsx         # Main app component
│   ├── Dockerfile          # Multi-stage build (Node build + Nginx serve)
│   └── nginx.conf          # Static file serving config
├── server/                 # Go + Gin backend (not yet implemented)
├── .github/workflows/      # CI/CD workflows
│   └── deploy.yml          # Build + deploy to production server
├── docker-compose.yml      # Local (or server) service orchestration
└── docs/                   # Documentation (PROJECT_CONTEXT.md, INFRASTRUCTURE.md, CICD_SETUP.md)
```

### Frontend Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **MUI (Material-UI)** - Component library
- **Zustand** - State management (lightweight alternative to Redux)
- **localStorage** - Data persistence (via Zustand persist middleware)

### State Management (Zustand Pattern)

The app uses Zustand with localStorage persistence persist middleware. All state is in `stores/goalStore.ts`:

**State**:
- `goals` - Array of goals with milestones

**Goal Actions**:
- `addGoal(title, description, milestoneTitles)` - Create a new goal with milestones
- `removeGoal(id)` - Delete a goal
- `updateGoal(id, updates)` - Update goal properties (title, description, color)
- `toggleGoalStatus(id)` - Toggle goal between active/completed

**Milestone Actions**:
- `addMilestone(goalId, title)` - Add a milestone to a goal
- `removeMilestone(goalId, milestoneId)` - Remove a milestone
- `toggleMilestone(goalId, milestoneId)` - Toggle milestone completion
- `updateMilestone(goalId, milestoneId, title)` - Update milestone title

**Storage**:
- Persisted to localStorage under key `starthere-storage`

When adding new state, follow the same pattern with `persist` middleware.

### Deployment Architecture

```
GitHub (code) → GitHub Actions → ghcr.io (image registry) → Production Server (Docker)
                                                   ↓
                                            Volcano Engine ALB (443)
                                                   ↓
                                            starthere-web container (port 80)
```

**Production Server**: `115.191.33.64` (Volcano Engine ECS, 2C4G)

---

## Key Design Decisions

1. **Dark Space Theme** - The app uses a dark theme with deep space colors (`#0B0D17` background), designed to evoke a night sky where goals are stars.

2. **Local Storage First** - Current implementation uses localStorage for data persistence. Backend (Go + Gin) is planned for future multi-device sync.

3. **Multi-stage Docker Build** - Reduces production image size by only shipping compiled static files (served by Nginx), not node_modules or source.

4. **Cross-platform Build** - Images are built for `linux/amd64` explicitly to support deployment from Mac M1 (arm64) to production server (x86).

5. **Goal-Milestone Hierarchy** - Goals contain multiple milestones. Users manually complete goals (not auto-completed when all milestones finish) for psychological satisfaction.

---

## Development Notes

### Creating New Features

1. Add types to `src/types/index.ts`
2. Add state actions to `src/stores/goalStore.ts`
3. Create components in `src/components/`
4. Style using MUI's `sx` prop or theme customization

### Theme Customization

Theme is configured in `src/theme/index.ts`. The color palette uses:
- Primary: `#90caf9` (light blue, star-like)
- Background: `#0B0D17` (deep space)
- Completed goals: `#FFD700` (gold, shining star)

### Frontend Learning Context

The developer has a strong backend/infrastructure background (Go, Python, C++, Kubernetes) and is actively learning frontend. When explaining React/TypeScript concepts, provide clear explanations - they are familiar with typed languages but new to frontend patterns.

---

## Infrastructure Resources (Volcano Engine)

| Resource | Details |
|----------|---------|
| ECS Server | 2C4G, IP: 115.191.33.64 |
| Database | MySQL (cloud-managed) |
| Domain | star-there.com / star-there.cn |
| ALB | Load balancer with HTTPS (SNI multi-certificate) |

---

## File Templates

When creating new documentation files, use existing templates:
- `docs/API_TEMPLATE.md` - For API documentation
- `docs/FEATURE_TEMPLATE.md` - For feature specifications

---

## Collaboration Preferences (AI Assistant Guidelines)

The developer has a strong backend/infrastructure background (Go, Python, C++, Kubernetes) and is actively learning frontend development. Please follow these guidelines:

1. **Explain concepts clearly** - When explaining React/TypeScript concepts, provide clear explanations. They are familiar with typed languages but new to frontend patterns.

2. **Multi-file changes need explanation** - When creating or modifying multiple files, explain each file's role and how they connect.

3. **Check environment first** - Before executing commands, verify dependencies are installed and explain what the command does.

4. **Break down complex tasks** - Split large features into small, verifiable steps. Confirm the plan before executing.

5. **Code review mindset** - AI-generated code should be reviewed and explained. Don't assume APIs exist without verification.

6. **Small steps, frequent verification** - Prefer incremental changes that can be tested frequently.

7. **Document decisions** - Update relevant documentation when making significant changes.

8. **Ask for clarification** - When requirements are ambiguous, ask rather than making assumptions.

---

## Frontend Learning Workflow (Important!)

The developer wants to LEARN frontend, not just have AI write all the code. Follow this workflow:

### 1. Task Discussion First
- Before writing code, discuss the feature: what components are needed, what state is required
- Let the developer think through the implementation approach first
- AI only supplements or corrects the approach

### 2. "You Write Main, AI Fills Details"
- **Developer writes**: Component structure, main logic, state/props design
- **AI fills in**: TypeScript type errors, complex styling, edge case handling

### 3. "Why?" Before Code
- When encountering unfamiliar APIs (useState, useEffect, etc.), pause to explain them
- Let the developer read MUI docs and guess prop purposes before verifying

### 4. Review + Explain After
- After code is written, AI reviews it
- Point out improvements and explain why (maintainability, performance, best practices)

### 5. Regular Knowledge Retrospective
- After completing a feature, summarize the React/MUI concepts used
- Document pitfalls encountered
- Organize into notes

### Example Conversation Flow
```
Developer: I want to build a "reset password" feature
AI: Good! First, what pages/components do you think we need?
Developer: A page to enter email, then a page to set new password...
AI: Correct! Also consider... (supplements)
Developer: Okay, let me start writing
(Developer writes component structure)
Developer: Help me fix this type error?
AI: (Explains the issue + fixes)
...
(Feature complete)
AI: Let's summarize what we learned today...
```

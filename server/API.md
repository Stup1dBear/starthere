# StartHere Backend API

## Base URL

```
http://localhost:8080/api/v1
```

## Authentication

Most endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### Authentication (Public)

#### Register a new user
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "yourusername",
  "email": "your@email.com",
  "password": "yourpassword"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

#### Get current user (Protected)
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

---

### Goals (Protected)

#### Get all goals
```http
GET /api/v1/goals
Authorization: Bearer <token>
```

#### Create a goal
```http
POST /api/v1/goals
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Learn Go",
  "description": "Master Go programming",
  "color": "#90caf9",
  "milestone_titles": ["Install Go", "Read tutorial", "Build project"]
}
```

#### Get a goal
```http
GET /api/v1/goals/:id
Authorization: Bearer <token>
```

#### Update a goal
```http
PUT /api/v1/goals/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "color": "#ffd700"
}
```

#### Toggle goal status
```http
PATCH /api/v1/goals/:id/toggle
Authorization: Bearer <token>
```

#### Delete a goal
```http
DELETE /api/v1/goals/:id
Authorization: Bearer <token>
```

---

### Milestones (Protected)

#### Add a milestone
```http
POST /api/v1/goals/:goalId/milestones
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New milestone"
}
```

#### Update a milestone
```http
PUT /api/v1/goals/:goalId/milestones/:milestoneId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated milestone title"
}
```

#### Toggle milestone completion
```http
PATCH /api/v1/goals/:goalId/milestones/:milestoneId/toggle
Authorization: Bearer <token>
```

#### Delete a milestone
```http
DELETE /api/v1/goals/:goalId/milestones/:milestoneId
Authorization: Bearer <token>
```

---

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error response:

```json
{
  "success": false,
  "error": "Error message"
}
```

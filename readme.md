# Beet Health - Voice Meal Logging Assistant

## Overview

This project is a voice-enabled meal logging assistant built using LiveKit Agents. Users can log, update, delete, and retrieve meal information through natural voice conversations. The assistant uses tool calling to interact with a backend service that persists meal data in MongoDB.

---

## Features

- 🎙️ Voice-based meal logging
- ➕ Log meals with quantity(optional) and meal-type(optional) and date(optional)
- ✏️ Update previously logged meals
- 🗑️ Delete meals
- 📋 Shows meal-logs in front-end
- 📅 Understand relative dates (today, yesterday, etc.)
- 🤖 Natural conversational responses powered by LiveKit Agents

---

## Tech Stack

## Frontend

- React
- Vite
- TypeScript
- LiveKit Components
- LiveKit Client (Core SDK that connects to a LiveKit room)

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Voice Agent

- LiveKit Agents (Framework)
- LiveKit Cloud  (Server provided by livekit)

---

## Project Structure

project-root
│
├── backend/
│
├── agent/
│
└── frontend/

---

## Setup Instructions

### Prerequisites

Install:

- Node.js (v22+)
- pnpm
- MongoDB Atlas account
- LiveKit Cloud account

---

## 1. Clone Repository

```bash
git clone <repository-url>

cd beet-meal-voice-agent
```

---

### 2. Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=<your-mongodb-uri>
```

Run

```bash
npm run dev
```

---

### 3. Agent Setup

```bash
cd agent

pnpm install
```

Create `.env`

```env
LIVEKIT_URL=...

LIVEKIT_API_KEY=...

LIVEKIT_API_SECRET=...
```

Run

```bash
pnpm dev
```

---

### 4. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## System Design

Microservices architecture
The application consists of three independent services:

### Frontend Sytem design

Provides the user interface and connects user to a LiveKit room.

### LiveKit Agent

Handles voice interactions, understands user requests using an LLM, invokes tools, and calls corresponding backend apis and generates conversational responses.

### Backend Sytem design

Stores meal data in MongoDB and exposes REST APIs for CRUD operations.

Flow:

User

↓

Frontend

↓

LiveKit Room

↓

Voice Agent

↓

Backend APIs

↓

MongoDB

---

## Design Decisions

### Tool-based architecture

Instead of allowing the LLM to directly manipulate the database, all database operations are performed through tools. This keeps the assistant reliable and makes backend operations deterministic.

### Separate consumedDate and loggedAt

The application stores:

- `consumedDate` – when the meal was eaten
- `loggedAt` – when the meal was recorded

This allows users to log meals retroactively while preserving audit information.

---

## Testing

The application was tested manually using various voice interaction scenarios.

Examples include:

- Log a meal
- Update a meal
- Delete a meal
- Retrieve meals by date
- Log multiple foods in a single request
- Relative date handling
- Updating non-existent meals
- Deleting non-existent meals
- Ambiguous update requests

---

## Known Limitations

- Authentication and user accounts are not implemented since they were outside the scope of the assignment.
- Suppose I eat 4 bananas today; Remove the bananas i logged for todays lunch.
    Then while getting/deleting/updating it would do filter by mealType and found no logged bananas.
    Solution is to replace below line with 2nd-below line
    mealType: { "Lunch" }
    mealType: { $in: ["Lunch", null, ""] }

- Suppose user say, update all the meals of today to yesterday.
    There is no feature to update consumedDate or loggedDate, because am not passing them in updateMealTool,
    because so many functionalities are not need to make.

- Suppose user say, tell me all meals I logged yesterday.
    So here it is not clear that user wants to have all meals with  consumedDate=yesterday or loggedDate= yesterday
    I have made the project like above line would mean consumedDate = yesterday

- We can add custom Error class to follow dry principle in the controllers.

---

## Future Improvements

Given more time, I would enhance the application in the following ways:

- **User authentication and data isolation:** The current implementation stores meal logs without user authentication, so all logs are shared. I would introduce user authentication (e.g., JWT/sessionId) and associate each meal with a `userId`, ensuring every user can access and manage only their own meal history.

- Currently at many places in code, we are passing too many variables. We can create DTO to improve code quality.

- **Automated testing:** Add comprehensive unit, integration, and end-to-end tests to improve reliability and simplify future maintenance.

- **Enhance frontend UI/UX**  Pagination, Lazy Loading, WCAG-guidelines, Animations

- **Enhanced natural language understanding:** Expand support for more complex date expressions and multi-step conversational requests.

- **Deployment and monitoring:** Deploy the application with CI/CD, logging, and monitoring for easier maintenance and production readiness.

- **Date-Time-Zone:** Currently agent will use the timezone of of that server where agent is deployed, Becasue we are fetching DateTime.Now() in agent folder. If user is in different timezone, it will still use server timezone. We can store date into {user_id,Country_Name} and {Country_Name,TimeZone} into database tables.

- "Concurrency Control" Suppose two devices simultaneosuly tell agent to increment apple count by 1, so we should use version_key of mongodb docs to do optimistic locking. If conflicts are frequent then do distributed locking  i.e.. redis, by await redis.set(`meal:${mealId}`, "locked", { NX:true, EX:10 }); method

## Demo

A demo video showing the application has been included with the submission is below.

Video
https://drive.google.com/file/d/1gws1GKavoQKpEfVuIlHO6z8bh8GWPSAU/view

Github
https://github.com/Krityuk/beet-meal-voice-agent

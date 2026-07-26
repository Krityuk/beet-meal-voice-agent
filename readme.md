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

### Two-step update flow

Updating a meal first searches for the matching meal and then updates it by ID. This allows the assistant to identify the correct record and handle ambiguous user requests gracefully.

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

- Manual testing has been completed; automated tests have not yet been added.
- Authentication and user accounts are not implemented since they were outside the scope of the assignment.

---

## Future Improvements

Given more time, I would enhance the application in the following ways:

- **Support bulk operations:** Currently, the assistant handles one update or delete operation at a time. I would extend it to support requests such as *"Delete all meals from yesterday"* or *"Update all breakfast entries for today"*.

- **User authentication and data isolation:** The current implementation stores meal logs without user authentication, so all logs are shared. I would introduce user authentication (e.g., JWT/sessionId) and associate each meal with a `userId`, ensuring every user can access and manage only their own meal history.

- **Automated testing:** Add comprehensive unit, integration, and end-to-end tests to improve reliability and simplify future maintenance.

- **Enhance frontend UI/UX** Add WebRTC, Pagination, Lazy Loading, WCAG-guidelines, Animations

- **Enhanced natural language understanding:** Expand support for more complex date expressions and multi-step conversational requests.

- **Deployment and monitoring:** Deploy the application with CI/CD, logging, and monitoring for easier maintenance and production readiness.

## Demo

A demo video showing the application has been included with the submission.

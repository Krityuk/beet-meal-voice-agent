# 🥗 Beet – Agentic AI Meal Tracker

An **Agentic AI powered voice meal tracking application** that enables users to log, retrieve, update, and delete meals through natural voice conversations.

The project combines **LiveKit Agents**, **React**, **Node.js**, **Express.js**, and **MongoDB** to build a real-time conversational meal assistant with automatic UI synchronization using **Server-Sent Events (SSE)**.

---

## Demo Video

    https://drive.google.com/file/d/1gws1GKavoQKpEfVuIlHO6z8bh8GWPSAU/view

## GitHub

    https://github.com/Krityuk/beet-meal-voice-agent

---

## ✨ Features

- 🎙️ Natural voice conversations
- 🤖 Agentic AI powered by LiveKit Agents
- ➕ Log meals using voice
- 📋 Retrieve meals
- ✏️ Update previously logged meals
- 🗑️ Delete meals
- 📅 Supports relative dates (Today, Yesterday, Last Week)
- 🍽️ Supports multiple meals in a single sentence
- 🔄 Real-time frontend updates using Server-Sent Events (SSE)
- ⚡ Optimistic locking for concurrent meal updates
- 🧪 Agent evaluation tests using LiveKit testing framework

---

## 🏗️ Architecture

                    Voice

                     │

                     ▼

             Deepgram STT

                     │

                     ▼

            Gemma 4 LLM (Agent)

                     │

             Tool Selection

                     │

        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼

   Log Meal     Update Meal   Delete Meal
        │
        ▼

      Express APIs

        │

        ▼

      MongoDB

        │

        ▼

 Server-Sent Events (SSE)

        │

        ▼

      React Frontend

        │

        ▼

     Cartesia TTS

---

## 🛠 Tech Stack

## Frontend

- React
- Vite
- TypeScript
- Axios
- LiveKit Components
- Server-Sent Events (SSE)

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## AI Agent

- LiveKit Agents
- Google Gemma 4 (LLM)
- Deepgram Nova-3 (Speech-to-Text)
- Cartesia Sonic-3 (Text-to-Speech)
- Zod
- Tool Calling

---

## 📂 Project Structure

project-root

├── frontend/
│   ├── components/
│   ├── api/
│   ├── types/
│   └── App.tsx
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── app.js
│
├── agent/
│   ├── tools/
│   ├── utils/
│   ├── agent.ts
│   ├── main.ts
│   └── tests/
│
└── foods.json

---

## 🎙️ Voice Pipeline

User Speaks

↓

Deepgram converts speech to text

↓

Gemma understands the request

↓

Chooses appropriate tool

↓

Backend REST API

↓

MongoDB

↓

Returns result

↓

Gemma generates response

↓

Cartesia converts response to speech

---

## 🤖 Agent Tools

The AI Agent uses dedicated tools instead of directly accessing the database.

### Log Meal Tool

Creates a new meal.

Examples

- I ate two bananas.
- I had rice for lunch.

---

### Get Meals Tool

Retrieves meals.

Examples

- What did I eat today?
- Show my breakfast.

---

### Update Meal Tool

Updates existing meals.

Examples

- Make it three bananas.
- Change lunch to dinner.

---

### Delete Meal Tool

Deletes meals.

Examples

- Remove today's coffee.
- Delete yesterday's lunch.

---

## ⚙️ Backend Design

The backend follows a layered architecture.

Routes

↓

Controllers

↓

Services

↓

MongoDB

Responsibilities are clearly separated.

- Controllers handle HTTP requests.
- Services contain business logic.
- Models manage persistence.

---

## 💻 Frontend Design

The frontend consists of independent React components.

App

├── VoiceAssistant

└── MealList
      │
      └── MealCard

The UI automatically refreshes whenever the backend emits an SSE event.

---

## 🔄 Real-Time Updates (SSE)

Whenever a meal is created, updated, or deleted,

Backend

↓

notifyClients()

↓

EventSource

↓

React reloads meals

This removes the need for polling while keeping the frontend synchronized.

---

## 🔒 Concurrency Control

Meal updates use **MongoDB Optimistic Locking**.

Every document contains a version field (`__v`).

During updates:

- Current version is verified.
- Update succeeds only if versions match.
- Conflicting updates return HTTP 409.

This prevents accidental overwrites when multiple clients modify the same meal simultaneously.

---

## 🧠 Design Decisions

## Tool-based Architecture

The LLM never directly modifies the database.

Instead,

LLM

↓

Tool

↓

REST API

↓

MongoDB

This makes the application deterministic, secure, and easier to maintain.

---

## foods.json as Source of Truth

Meals only store

- foodId
- quantity
- mealType
- consumedDate

Nutrition information is loaded from `foods.json`.

Advantages:

- No duplicated nutrition data
- Easy updates
- Consistent nutritional values

---

## Separate consumedDate and loggedAt

Each meal stores two timestamps.

### consumedDate

When the user actually ate the meal.

### loggedAt

When the meal was recorded.

This allows retroactive meal logging.

---

## 🧪 Testing

The project includes LiveKit Agent evaluation tests.

Covered scenarios include:

- Greeting users
- Logging meals
- Retrieving meals
- Updating meals
- Deleting meals
- Multiple foods in one sentence
- Unknown foods
- Relative date handling
- Handling large no of Edge Cases

---

## 🚀 Setup

## Clone

git clone [repoUrl]

cd beet-meal-voice-agent

## Backend Setup

cd backend

npm install

Create

.env

env
PORT=5000

MONGODB_URI=...
LIVEKIT_URL=...
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...

Run

npm run dev

---

## Agent

cd agent

pnpm install

Create

.env.local

env
LIVEKIT_URL=...

LIVEKIT_API_KEY=...

LIVEKIT_API_SECRET=...

Run

pnpm dev

---

## Frontend Setup

cd frontend

npm install

npm run dev

---

## 🔮 Future Improvements

- User authentication
- User-specific meal history
- Better frontend UI/UX
- Docker deployment
- CI/CD pipeline
- Comprehensive unit and integration tests
- Better natural language understanding
- Multi-language voice support
- Timezone-aware meal logging
- Redis-based distributed locking for high concurrency

---

## ⚠️ Known Limitations

- No authentication (assignment scope).
- Supports one shared meal database.
- Timezone is determined by the agent server.
- Complex conversational references may require clarification.
- Date updates are not currently supported.

---

## 👨‍💻 Author

    **Krityuk**

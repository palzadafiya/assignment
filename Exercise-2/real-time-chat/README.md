# 💬 Real-Time Chat Application

A simple yet powerful **real-time chat application** built with **TypeScript** and **Node.js**, designed to demonstrate **core software design patterns** — `Singleton`, `Observer`, and `Adapter` — while following a **clean, decoupled architecture**.

Users can connect via a **console-based client**, join different chat rooms, and exchange messages **in real time** with others.

---

## ✨ Features

- ⚡ **Real-Time Messaging:** Send and receive messages instantly using WebSockets.  
- 🏠 **Multiple Chat Rooms:** Create or join unique chat rooms using a room ID.  
- 📜 **Chat History:** View the chat history upon joining a room.  
- 👥 **Active User List:** Get notified when users join or leave a room.  
- 🏗️ **Decoupled Architecture:** Built with design patterns for flexibility and scalability.

---

## 🏛️ Architectural Design

The application is structured around three classic design patterns to ensure **maintainability**, **scalability**, and **ease of extension**:

### 🔁 Singleton Pattern
- **`ChatRoomManager`** implements the Singleton pattern.  
- Ensures only one global instance manages all chat rooms — like a reception desk handling all hotel rooms.

### 👀 Observer Pattern
- **`ChatRoom`** acts as the **Subject**, and **`User`** objects are **Observers**.  
- When a message is posted, all subscribed users are automatically notified — like a YouTube creator notifying all subscribers of a new video.

### 🔌 Adapter Pattern
- **`WebSocketAdapter`** implements a generic **`ICommunicationAdapter`** interface.  
- Decouples the chat logic from the communication protocol — allowing future adapters (e.g., HTTP, MQTT) without changing the core system.  
- Works like a **universal travel adapter**, letting the app connect to different "sockets" (protocols).

---


---

## 🚀 Getting Started

Follow the steps below to run the project locally:

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [TypeScript](https://www.typescriptlang.org/)

---

### 📦 Installation & Setup

Clone the repository and install dependencies:

```bash
git clone <your-repository-url>
cd real-time-chat
cd server && npm install
cd client && npm install
```


### How to Run

-   You’ll need two terminal windows — one for the server and one for the client.

1) Start the Server - cd server && npm start
✅ You should see a log indicating that the server is listening on port 8080.

2) Run the Console Client - cd client && npm start
    -   Enter your name and a room ID when prompted.
    -   You’ll see any previous messages and a > prompt to start chatting.

3) You may also run Browser client by opening the browser-client.html file.

Open another terminal and run the client again with a different name to chat in real time.
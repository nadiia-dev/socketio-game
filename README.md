# Socket.IO Game

This is a simple real-time multiplayer game built with **Node.js**, **Express**, **Socket.IO**, and **HTML/CSS/JavaScript** on the frontend. This game is a **clone of Agar.io**, where players can join a shared game room, see each other in real-time, and control their avatars with mouse moves.

## 🎮 Features

- Real-time player movement using **Socket.IO**
- Randomly assigned player colors for easy identification
- Player position synchronization between all connected clients
- Dynamic player join/leave handling
- Github authorization

## 🛠️ Tech Stack

**Frontend:**

- HTML
- CSS
- Vanilla JavaScript

**Backend:**

- Node.js
- Express.js
- Socket.IO

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** installed on your machine.

Additionally, you need to set up **OAuth** for your GitHub account. Here's how:

1. Go to [GitHub OAuth settings](https://github.com/settings/applications) and create a new OAuth application.
2. Follow the instructions to set up the callback URL and get the client ID and client secret.
3. Add the obtained client ID and secret to your **.env** file as required.

Once these steps are complete, you can continue with the installation process.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nadiia-dev/socketio-game.git
   ```

2. Navigate to the project directory:

   ```bash
   cd socketio-game
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create .env file in the root of the project and fill it with enviroтment variables according to .env.example file.

5. Start the development server:

   ```bash
   npm start
   ```

6. Open your browser and go to:
   ```
   http://localhost:9000
   ```

Open multiple tabs or browsers to simulate multiple players.

## 💡 Inspiration

This project was created as a fun way to explore how real-time communication works with Socket.IO. It helped reinforce my understanding of WebSockets, event handling, and syncing data between multiple clients.

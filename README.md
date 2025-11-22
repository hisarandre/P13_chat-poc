# P13 – Your car your way

## 📌 Description

This project is a proof of concept (PoC) for the Your Car Your Way application. It implements a real-time chat between customers and support agents.

- The backend is developed in Java with Spring Boot and uses WebSocket for real-time communication.
- The frontend is built with Angular and provides an interactive interface for sending and receiving messages in real-time.

## 🛠️ Technologies Used

**Backend:**

- Java 21
- Spring Boot
- STOMP Protocol
- WebSocket
- Maven
- Lombok
- SockJS (WebSocket)

**Frontend:**

- Angular 20
- Angular Material
- Tailwind CSS
- TypeScript
- RxJS
- STOMP.js
- SockJS Client

## 🚀 Installation

### Setup & Run

#### 1. Clone the repository:

```bash
git clone https://github.com/hisarandre/P13_chat-poc
cd P13_chat-poc
```

#### 2. Launch backend

```bash
cd back
mvn clean install
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080`

#### 3. Launch the frontend:

```bash
cd front
npm install
ng serve
```

The frontend will be available at `http://localhost:4200`

## 🗂️ Testing

- **Client chat interface:**  
  http://localhost:4200

- **Support chat interface:**  
  http://localhost:4200/support

All participants (clients and support) share the same chat room and can see all messages in real-time.

## ⚠️ Limitations

This is a proof of concept with the following limitations:

- **No authentication or authorization:** Anyone can connect without credentials
- **No user roles management:** No distinction between client and support roles
- **No persistence:** Messages are stored in-memory and lost on server restart
- **Single chat room:** All users share the same conversation (no private sessions)
- **No message history limit:** Messages accumulate indefinitely in memory
- **No scalability:** In-memory storage is not suitable for production

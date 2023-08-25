# Video-Calling-app
This repository contains the code for creating a signaling server using popular JavaScript libraries and frameworks: socket.io, express, and peer. This server is essential for enabling real-time communication and data exchange in applications such as video conferencing, peer-to-peer connections, and more.

## Server Initialization
To set up the signaling server, the following steps are performed in the code:

**1. Importing Dependencies:** The necessary libraries are imported using **ES6 module syntax**. These include **express**, **http** for creating the server, **socket.io** for WebSocket-based communication, **peer** for WebRTC peer-to-peer connections, and **uuid** for generating unique room IDs.

**2. Server Configuration:** The server is configured to listen on a specified port, which can be defined by the PORT environment variable or defaults to port 3000.

**3. Express Middleware:** Express middleware is used to configure the server for handling HTTP requests. The **express.static** middleware serves static assets from the "public" directory, and routes are defined for rendering HTML pages.

**4. HTML Page Rendering:** Two routes are defined:
  - GET /:room: This route renders an HTML page for a specific room, identified by a room ID passed as a URL parameter.
  - GET /: This route generates a unique room ID using uuid and redirects to the room page.

**5. User Management:** The users object is used to store user information based on their socket ID. When a new user connects, their username is stored in the users object.

**6. WebSocket Communication:** Socket.io is used for WebSocket-based communication. The server listens for various events, such as "new-user," "join-room," "message," and "disconnect," to facilitate real-time interactions among users. Users can send and receive messages and join specific rooms.

**7. Peer Server:** A Peer server is created using ExpressPeerServer and mounted at the /peerjs path. This server is used for setting up peer-to-peer connections.

**8. Server Start:** The server is started and listens on the specified port. A console log message indicates that the server has started successfully.

## Getting Started

To run the signaling server locally, follow these steps:

- Clone this repository to your local machine.<br>
- Navigate to the project directory using your terminal.<br>
- Install the required dependencies by running npm install or yarn install.<br>
- Start the server with npm start or yarn start.

The signaling server should now be running locally and ready to handle real-time communication between clients.

## Project Structure
The project structure consists of a main server file and routes for rendering HTML pages. The "public" directory contains static assets and HTML templates.

Feel free to explore and modify the code to integrate this signaling server into your real-time applications, such as video conferencing, chat applications, or any other use case that requires WebSocket-based communication.

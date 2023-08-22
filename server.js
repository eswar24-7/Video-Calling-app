//Creating a  Signalling server using socket.io, express and peer

import express from "express";
import http from "http";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";
import { v4 as uuidV4 } from "uuid";

const port = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);
const io = new Server(server);
const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use("/peerjs", peerServer);
app.set("view engine", "ejs");
app.use(express.static("public"));

// Calling our html page to open
app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room })
});

// Creating a unique room-id
app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`)
});

const users = {};
// Handling connections
io.on("connection", socket => {
  // Storing the name of user
  socket.on("new-user", userName =>{
    users[socket.id] = userName;
  });

  // Connecting the user to other users
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);
    io.to(roomId).emit("user-joined", users[socket.id])

    // sending the message and time of message from one user to other
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", { 
        message: message, 
        userName: users[socket.id]
      });
    }); 
    
    // Disconnectiong the user
    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId)
      socket.to(roomId).emit("user-left", users[socket.id])
      });
    });
});

server.listen(port, () => {
  console.log(`server started on port ${port}.`);
});

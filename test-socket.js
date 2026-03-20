// const { io } = require("socket.io-client");
// // import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// // socket.on("connect", () => {
// //   console.log("connected");
// //   socket.emit("message", "hello");
// // });


// // ==============================

// socket.on("connect", () => {
//   console.log("connected");
// });

// setTimeout(() => {
//   socket.emit("message", "hello after 5 seconds");
//   socket.emit("message", "TEST-12345");
// }, 5000);

// // ================================

// socket.on("connect", () => {
//   console.log("connected:", socket.id);
// });

// socket.on("message", (msg) => {
//   console.log("received:", msg);
// });

// setTimeout(() => {
//   socket.emit("message", "hello from " + socket.id);
// }, 3000);

// // run the project and  then in another terminal run this file using node test-socket.js
// // you should see the connection message and then after 3 seconds, the message sent from this client.
// // you can also see the message received on the server terminal.
// // you can run multiple instances of this test file to simulate multiple clients connecting to the server.
// // you can also modify the message sent to include some unique identifier (like socket.id) to see which client is sending the message.
// // Note: Make sure the server is running before executing this test file.

// // ================================

// socket.emit("join-room", "room1");

// setTimeout(() => {
//   socket.emit("room-message", {
//     room: "room1",
//     message: "Hello room"
//   });
// }, 3000);
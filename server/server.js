import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    // allowedHeaders: ["Content-type"],
  },
});

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR => ", err));

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// autoload routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// socketio
// io.on("connect", (socket) => {
//   // console.log("SOCKET>IO", socket.id);
//   socket.on("send-message", (message) => {
//     // console.log("new message received => ", message);
//     socket.broadcast.emit("receive-message", message);
//   });
// });

io.on("connect", (socket) => {
  // console.log("SOCKET>IO", socket.id);
  socket.on("new-post", (newPost) => {
    // console.log("socketio new post => ", newPost);
    socket.broadcast.emit("new-post", newPost);
  });
});

const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server running on port ${port}`));

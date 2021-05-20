import express, { Express } from "express";
import * as http from "http";
import * as socketio from "socket.io";
import cors from "cors";
import path from "path";
// import { startSocket } from "./src/routes/socket";

const PORT: string | number = process.env.PORT || 5000;
const CLIENT_HOST: string = "http://localhost:3000";

const app: Express = express();

// Set up http server and socket server
const server: http.Server = http.createServer(app);
// export const io: socketio.Server = new socketio.Server(server, {
//   cors: {
//     origin: CLIENT_HOST,
//     credentials: true,
//   },
// });

app.use(cors());

// startSocket(io);

app.get("/hello", (req, res) => {
  return res.status(200).send({ hello: "hello world" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.set("port", PORT);

// Start server
server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";
const PORT = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app, {
  connectionStateRecovery: {},
});
app.disable("x-powered-by");
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user has connected!");

  //indica si hay una connecion abierta
  // console.log(socket.connected);

  // console.log(socket.id);

  //clientes conectados
  //console.log(socket.client.server.eio.clientsCount);
  socket.on("disconnect", () => {
    console.log("a user has disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

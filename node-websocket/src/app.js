import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";
import {createClient} from "@libsql/client"
import "dotenv/config.js"
const PORT = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app, {
  connectionStateRecovery: {},
  
}); 


const db = createClient({
  url:process.env.DB_URI,
  authToken: process.env.AUTH_DB_TOKEN

})


db.execute(`
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT,
  user TEXT
)
`)
app.disable("x-powered-by");
const io = new Server(server);
io.on("connection", async (socket) => {
  console.log("a user has connected!");
  

  //indica si hay una connecion abierta
  // console.log(socket.connected);

  // console.log(socket.id);

  //clientes conectados
  //console.log(socket.client.server.eio.clientsCount);

  socket.on("disconnect", () => {
    console.log("a user has disconnected");
  });

  socket.on("chat message", async (msg) => {

    let result 
    // recuperamos valores que se le pasan al socket
  const username = socket.handshake.auth.username ?? "anomyus"
    try {
      
      result = await db.execute({
        sql: "INSERT INTO messages (content, user) VALUES (:msg, :username)",
        args: {msg, username}
      })
    } catch (error) {
      console.log(error)
    }
    
    io.emit("chat message", msg, result.lastInsertRowid.toString(), username);
  });


  //sirve para recuperar paquetes perdidos por desconeccion temporal
  if(!socket.recovered){

    try {
      const result = await db.execute({
        sql: "SELECT id,content, user FROM messages WHERE id > ?",
        args: [socket.handshake.auth.serverOffset ?? 0]
      })


      result.rows.forEach(row => {
        socket.emit("chat message",row.content ,row.id.toString(), row.user)
      })
    } catch (e) {
      console.log(e)
    }

    
  }
});
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

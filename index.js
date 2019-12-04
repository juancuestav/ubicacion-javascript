const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const Twitter = require("twitter");

// Inicializar 
const app = express();
app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), () => {
  console.log("Servidor escuchando en puerto: 3000");
});

const io = socketIO(server);

// static files
app.use(express.static(path.join(__dirname, "public")));

//Twitter
var cliente = new Twitter({
  consumer_key: "fjPhe4NOhxIAUaTNj9h7S4XmT",
  consumer_secret: "1QcGWpx4uK9tNl8w2wCSuW03GzBazOq8nl5CgxSPNqoNKgDy1c",
  access_token_key: "1201927500852531200-sWS33Xjfz0Pj68RTZRFLG0O0vaT32j",
  access_token_secret: "AMDtdVCGl8VJ0QUJsZd3GdJ7zvsZmkYxLBBbG9q41hJQU"
});

//Socket
io.on("connection", socket => {
  console.log("Nueva conexion");
  socket.on("mensaje", data => {
    
      cliente.get("users/search", { q: data.usuario }, function(error, response, r) {
        var person = response[0];
        if(person != null){
          io.sockets.emit("ubicacion", person.location);
        }else{
          io.sockets.emit("ubicacion", 'Cuenta no encontrada');        
        }
      });
    
      
    
  });
});

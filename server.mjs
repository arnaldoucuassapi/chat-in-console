import net from "net";

const port = 2005;
const server = net.createServer();

let clients = [];

server.on("connection", (socket) => {
  console.log(`Conectou-se ao Console Chat!`);

  clients.push(socket);

  socket.on("data", (data) => {
    const message = data.toString();

    server.getConnections((err, count) => {
      console.log("Conexoes:",count);
  
      if (!err) {
        clients.forEach((client) => {
          if (client != socket) {
            client.write(message);
          }
        })
      }
    });
  });

  socket.on("end", () => {
    console.log("Desconectou-se ao Console Chat :(");
  });
});

server.listen({
  port,
  hostname: "127.0.0.1"
}, () => {
  console.log(`Server running in port ${port}...\nStart the console chat :)`);
});
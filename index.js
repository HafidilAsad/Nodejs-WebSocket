const WebSocket = require("websocket").server;
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(404);
  res.end();
});
server.listen(3200, () => {
  console.log("Server listening on port 3200");
});

const wsServer = new WebSocket({
  httpServer: server,
});

wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);

  console.log("WebSocket connection established");

  connection.on("message", (message) => {
    if (message.type === "utf8") {
      console.log("Received message:", message.utf8Data);
    }
  });

  connection.on("close", (code, desc) => {
    console.log(`WebSocket connection closed - Code: ${code}, Reason: ${desc}`);
  });
});

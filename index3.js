const { log, error } = require("console");
const net = require("net");

const host = "10.14.20.191";
const port = 9001;

const client = new net.Socket();

client.connect(port, host, () => {
  console.log(`CONNCTED TO ${host}:${port}`);

  setInterval(() => {
    client.write("Heartbeat");
  }, 30000);
});

client.on("data", (data) => {
  const receivedData = data.toString();
  console.log("====================================");
  console.log(receivedData);
  console.log("====================================");
});

client.on("close", () => {
  console.log("====================================");
  console.log("Connection Closed");
  console.log("====================================");
});

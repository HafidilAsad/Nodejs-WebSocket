const net = require("net");

const host = "10.14.139.191";
const port = 9001;

const client = new net.Socket();

client.connect(port, host, () => {
  console.log(`Connected to ${host}:${port}`);

  setInterval(() => {
    client.write("Heartbeat");
  }, 30000);
});

client.on("data", (data) => {
  const receivedData = data.toString();
  const receivedData2 = receivedData.replace("=", "");
  console.log("Received data timbangan:", receivedData2);
});

client.on("close", () => {
  console.log("Connection closed");

  client.connect(port, host);
});

client.on("error", (err) => {
  console.error("Error:", err);
});

client.setNoDelay(true);

client.setKeepAlive(true, 30000);

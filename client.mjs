import { Socket } from "net";
import readLine from "readline";

const client = new Socket();

const rl =  readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect({ port: 2005 }, () => {
  console.log("Welcome to Console Chat :)");

  rl.on("line", (message) => {
    client.write(message);
    console.log("Eu:", message);
  });

  client.on("data", (message) => {
    console.log("Outro:", message.toString());
  });
});
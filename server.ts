import App from "./app";
import { Logger } from "./logger";
const http = require("http");
import { InitializeConnection } from "./orm/dbCreateConnection";

const logger = new Logger();
const port = 8080;

App.set("port", port);
const server = http.createServer(App);
server.listen(port);

server.on("listening", () => {
  let addr = server.address();
  let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  logger.info(`Listening on ${bind}`);
});

(() => {
  InitializeConnection();
})();

export default App;

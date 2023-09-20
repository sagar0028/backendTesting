const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const route = require("./src/router/index");
class Server {
  constructor() {
    // import variables from .env file
    dotenv.config();

    this.app = express();
    this.port = process.env.PORT || 3000;

    // parse the incoming URL-encoded form data with a specified size disable extended parsing.
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    const router = express.Router();

    router.get("/", (req, res) => {
      res.send("Router Route");
    });

    this.app.use(route);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}.`);
    });
  }
}
const server = new Server();
server.start();

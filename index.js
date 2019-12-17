const express = require("express");
require("dotenv").config();
var cors = require("cors");
const commentsRouter = require("./src/routes/comments.route");
const listEndpoints = require("express-list-endpoints");

const server = express();
const port = process.env.PORT;

var whitelist = [
  "http://localhost:3000/",
  "https://be-netflix-react-comments.herokuapp.com/",
  "http://be-netflix-react-comments.herokuapp.com/",
  "https://faizanbardai.github.io/netflix-react/",
  process.env.FE_URL
];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

server.use(cors(corsOptions));
// server.use(cors());
server.use(express.json());
server.get("/", (req, res) => {
  res.send("server says hi!");
});
server.use("/comments", commentsRouter);

console.log(listEndpoints(server));

server.listen(port, () => console.log(`Listening on port ${port}!`));

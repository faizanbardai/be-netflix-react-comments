const express = require("express");
require("dotenv").config();
var cors = require("cors");
const listEndpoints = require('express-list-endpoints')

const server = express();
const port = process.env.PORT;

// var whitelist = ["http://localhost:3000/"];
// var corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

// server.use(cors(corsOptions));
server.use(cors());
server.use(express.json());

server.get("/one", (req, res) => {
  res.send("hello");
});

console.log(listEndpoints(server));

server.listen(port, () => console.log(`Listening on port ${port}!`));

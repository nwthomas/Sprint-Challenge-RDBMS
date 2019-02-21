const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("Dude!");
});

module.exports = server;

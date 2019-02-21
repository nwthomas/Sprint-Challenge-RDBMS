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

server.get("/api/projects", async (req, res) => {
  try {
    const projects = await db("projects");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "There was an error retrieving the projects from the database.",
      error
    });
  }
});

server.get("/api/projects/:id", async (req, res) => {
  try {
    const project = await db("projects").where({ id: req.params.id });
    if (project.length) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "That project could not be found in the database." });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error retrieving the project from the database.",
      error
    });
  }
});

server.post("/api/projects", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      message:
        "Please include a name, completion status, and description, and try again."
    });
  }
  try {
    const project = await db("projects").insert(req.body);
    if (project) {
      res
        .status(200)
        .json({ message: "Project created successfully.", project });
    } else {
      res
        .status(404)
        .json({ message: "The project could not be added to the database." });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error adding the project to the database.",
      error
    });
  }
});

module.exports = server;

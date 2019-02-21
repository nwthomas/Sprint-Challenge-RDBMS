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

// =============================================== Projects

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
    const projects = await db("projects").where({ id: req.params.id });
    const actions = await db("actions").where({ project_id: req.params.id });
    if (projects.length) {
      const project = projects[0];
      res.status(200).json({ ...project, actions });
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

server.put("/api/projects/:id", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      message:
        "Please include a name and description and try updating the project again."
    });
  }
  try {
    const project = await db("projects")
      .where({ id: req.params.id })
      .update({ ...req.body });
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "The project could not be found to be updated." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error while updating the project" });
  }
});

server.delete("/api/projects/:id", async (req, res) => {
  try {
    const project = await db("projects")
      .where({ id: req.params.id })
      .del();
    if (project) {
      res.status(200).json({
        message: "Project was deleted successfully.",
        numProjectsDeleted: project
      });
    } else {
      res.status(404).json({ message: "The project could not be deleted." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error deleting the project.", error });
  }
});

// =============================================== Actions

server.get("/api/actions", async (req, res) => {
  try {
    const actions = await db("actions");
    if (actions.length) {
      res.status(200).json(actions);
    } else {
      res
        .status(404)
        .json({ message: "No actions could be found in the database." });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error retriving the actions from the database.",
      error
    });
  }
});

server.post("/api/actions", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.notes ||
    !req.body.project_id
  ) {
    return res.status(400).json({
      message:
        "Please include a name, description, project ID, and notes about the action, and try again."
    });
  }
  try {
    const action = await db("actions").insert(req.body);
    if (action) {
      res.status(200).json({
        message: "The action was successfully created in the database.",
        numActionCreated: action
      });
    } else {
      res
        .status(404)
        .json({ message: "The action could not be added to the database." });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error adding the action to the database.",
      error
    });
  }
});

module.exports = server;

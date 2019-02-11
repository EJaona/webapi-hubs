const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

// The C in CRUD

server.post("/hubs", (req, res) => {
  const hub = req.body;

  db.hub
    .add(hub)
    .then(hub => {
      res.status(201).json({ success: true, hub });
    })
    .catch(({ code, message }) => {
      res.status(code).jason({ success: false, message });
    });
});

// The R in CRUD
server.get("/", (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.status(200).json({ success: true, hubs });
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});

// The U in CRUD

// The D in CRUD
server.delete("/hubs/:id", (req, res) => {
  const hubId = req.params.id;

  db.hubs
    .remove(hubId)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(({ code, message }) => {
      res.status(code).json({ success: false, message });
    });
});

server.listen(4000, () => {
  console.log("\n*** Running on port 4000***/n");
});

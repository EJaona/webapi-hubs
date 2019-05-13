const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

// The C in CRUD

server.post("/api/users", (req, res) => {
  const hub = req.body;

  db.hubs
    .add(hub)
    .then(hub => {
      res.status(201).json({ success: true, hub });
    })
    .catch(({ code, message }) => {
      res.status(code).jason({ success: false, message });
    });
});

// The R in CRUD
server.get("/api/users", (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.status(200).json({ success: true, hubs });
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.hubs
    .findById(id)
    .then(hubs => {
      res.status(200).json({ success: true, hubs });
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});

// The U in CRUD
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.hubs
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({
          success: false,
          message: "I cannot find the hub you are looking for"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ success: false, message });
    });
});

// The D in CRUD
server.delete("/api/users/:id", (req, res) => {
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

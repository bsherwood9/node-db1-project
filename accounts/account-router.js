const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  const orderby = req.query.orderby || "name";
  const limit = req.query.limit || -1;
  const sortdir = req.query.sortdir || "desc";
  db.select("*")
    .from("accounts")
    .orderBy(orderby, sortdir)
    .limit(limit)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err =>
      res.status(500).json({ message: "error retrieving posts", err })
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("accounts")
    .where({ id })
    .first()
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res
          .status(400)
          .json({ message: "Could not find that account by that Id" });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Error occurred while fetching" })
    );
});

router.post("/", validatePost, (req, res) => {
  const realCoolMessage = process.env.AwesomeStuff || "Suh dude!";
  const changes = req.body;
  db("accounts")
    .insert(changes)
    .then(data => res.status(200).json({ message: realCoolMessage, data }))
    .catch(err =>
      res
        .status(500)
        .json({
          message: "There was an error trying to upload this account",
          err
        })
    );
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .update(changes)
    .then(update => {
      if (update) {
        res.status(200).json({ UpdatedInfo: update });
      } else {
        res.status(404).json({ message: "The id could not be found." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error while editing this account" }, err)
    );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .del()
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ DeletedAcct: deleted });
      } else {
        res.status(404).json({
          message: "The id could not be found and therefore it was not deleted."
        });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json(
          { message: "There was an error while deleting this account" },
          err
        )
    );
});

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  if (typeof body.budget !== "number") {
    res
      .status(404)
      .json({ message: "please add a valid number to budget field" });
  }
  if (!body.name) {
    res.status(404).json({ message: "missing required name field" });
  } else if (!body.budget) {
    res.status(404).json({ message: "missing required budget field" });
  } else {
    next();
  }
}
module.exports = router;

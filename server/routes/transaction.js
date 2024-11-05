import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { deserialize, ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /transaction.
const router = express.Router();

// This section will help you get a list of all the transactions.
router.get("/", async (req, res) => {
  let collection = await db.collection("transactions");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single transaction by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("transactions");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new transaction.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      amount: req.body.amount,
      description: req.body.description,
      type: req.body.type,
    };
    let collection = await db.collection("transactions");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding transaction");
  }
});

// This section will help you update a transaction by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        amount: req.body.amount,
        description: req.body.description,
        type: req.body.type,
      },
    };

    let collection = await db.collection("transactions");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating transaction");
  }
});

// This section will help you delete a transaction
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("transactions");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting transaction");
  }
});

export default router;

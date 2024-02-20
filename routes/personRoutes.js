const express = require("express");
const Person = require("../Models/Person");
const router = express.Router();
const bodyParser = require("body-parser");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log("Data saved", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server Error");
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Work not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

// Update person's info
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //Return the updated document
        runValidators: true, //Run Mongoose validation
      }
    );

    if (!response) return res.status(404).json({ error: "Person Not Found" });

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal error");
  }
});

// delete person
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json("Person not found: 404");
    }
    res.status(200).json("Person deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal serve error");
  }
});

module.exports = router;

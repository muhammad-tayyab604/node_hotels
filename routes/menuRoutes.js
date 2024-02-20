const express = require("express");
const Menu = require("../Models/menu");
const router = express.Router();
const bodyParser = require("body-parser");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = await new Menu(data);
    const response = await newMenu.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error");
    res.status(500).json("Internal Server Error");
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await Menu.find({ taste: tasteType });
      console.log("Data fetched");
      res.status(200).json(response);
    } else {
      console.log("Data not found");
      res.status(404).json("Taste not found: 404");
    }
  } catch (error) {}
});

// update Menu
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenu = req.body;
    const response = await Menu.findByIdAndUpdate(menuId, updatedMenu, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json("Menu Not Found");
    }

    res.status(200).json(response);
    console.log("Data updated");
  } catch (error) {
    res.status(500).json("Internal server error");
    console.log(error);
  }
});

// Delete the menu
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await Menu.findByIdAndDelete(menuId);
    if (!response) {
      res.status(400).json({ error: "Menu not fount" });
    }
    res.status(200).json("Menu deleted Successfully");
    console.log("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;

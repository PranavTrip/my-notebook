const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const User = require("../models/user");
const router = express.Router();
const {vody,validationResult}=require ("express-validator")
// Route 1 : Fetch all notes of logged in users using /api/notes/fetchallusers . Login required.
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Some Error Occured");
  }
});

module.exports = router;

const express = require("express");
const noteRouter = express.Router();
const { body, validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");
const Note = require("../models/note");

// Get all notes
noteRouter.get("/note/view", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send("Error fetching notes: " + error.message);
  }
});

// Create a new note
noteRouter.post(
  "/note",
  [
    body("title").trim().notEmpty().withMessage("Title is required."),
    body("content").trim().notEmpty().withMessage("Content is required."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, content } = req.body;

      // Sanitize inputs
      const sanitizedTitle = sanitizeHtml(title);
      const sanitizedContent = sanitizeHtml(content);

      const note = new Note({ title: sanitizedTitle, content: sanitizedContent });
      await note.save();

      res.status(201).json(note);
    } catch (error) {
      res.status(500).send("Error creating note: " + error.message);
    }
  }
);

// Update an existing note
noteRouter.patch(
  "/note/edit/:id",
  [
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty."),
    body("content").optional().trim().notEmpty().withMessage("Content cannot be empty."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const updates = req.body;

      // Sanitize inputs
      if (updates.title) updates.title = sanitizeHtml(updates.title);
      if (updates.content) updates.content = sanitizeHtml(updates.content);

      const updatedNote = await Note.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedNote) {
        return res.status(404).send("Note not found.");
      }

      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(500).send("Error updating note: " + error.message);
    }
  }
);

// Delete a note
noteRouter.delete("/note/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).send("Note not found.");
    }

    res.status(200).send("Note deleted successfully.");
  } catch (error) {
    res.status(500).send("Error deleting note: " + error.message);
  }
});

module.exports = noteRouter;

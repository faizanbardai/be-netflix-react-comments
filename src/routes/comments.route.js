const express = require("express");
const path = require("path");
const router = express.Router();
const helpers = require("../helpers");
const commentsFilePath = path.join(__dirname, "../data/comments.json");
const uuidv1 = require("uuid/v1");

router.get("/", async (req, res) => {
  const allComments = await helpers.getAllComments(commentsFilePath);
  res.send(allComments);
});

router.get("/:movieID", async (req, res) => {
  const allComments = await helpers.getAllComments(commentsFilePath);
  movieComments=allComments.filter(comment => comment.elementId === req.params.movieID);
  res.send(movieComments);
});

router.post("/", async (req, res) => {
  const newComment = {
    ...req.body,
    _id: uuidv1(),
    createdAt: new Date()
  };
  await helpers.writeComment(commentsFilePath, newComment);
  res.send(newComment);
});

router.delete("/:id", async (req, res) => {
  const commentToDelete = req.params.id;
  const deletedComment = await helpers.deleteComment(
    commentsFilePath,
    commentToDelete
  );
  deletedComment ? res.send(deletedComment) : res.send("ID not found!");
});

module.exports = router;

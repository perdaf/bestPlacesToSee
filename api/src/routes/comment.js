const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

router.route("/").get(commentController.index);
//   .post(commentController.createComment);

router.route("/:id").get(commentController.searchComment);

module.exports = router;

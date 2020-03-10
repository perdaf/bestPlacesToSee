const express = require("express");
const router = express.Router();

const { auth } = require("../sharing/verifiedToken");
const commentController = require("../controllers/commentController");

router.route("/:placeId/create").post(auth, commentController.createComment);

router
  .route("/:cmtId")
  .get(commentController.searchComment)
  .patch(commentController.updateComment);

router.route("/").get(commentController.index);

module.exports = router;

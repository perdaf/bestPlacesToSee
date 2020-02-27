const express = require("express");
const router = express.Router();

const { auth } = require("../verifiedToken");

const commentController = require("../controllers/commentController");

router.route("/").get(commentController.index);
router.route("/:placeId/create").post(auth, commentController.createComment);

router
  .route("/:cmtId")
  .get(commentController.searchComment)
  .patch(commentController.updateComment);

module.exports = router;

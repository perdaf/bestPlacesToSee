const express = require("express");
const router = express.Router();
const { auth } = require("../sharing/verifiedToken");

const placeController = require("../controllers/placeController");

router.route("/:placeId/:cmtId").delete(auth, placeController.deleteComment);

router
  .route("/:placeId")
  .get(placeController.searchPlace)
  .patch(placeController.updatePlace)
  .delete(auth, placeController.deletePlace);

router
  .route("/")
  .get(placeController.index)
  .post(auth, placeController.uploadImage, placeController.createPlace);

module.exports = router;

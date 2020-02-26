const express = require("express");
const router = express.Router();
const { auth } = require("../verifiedToken");

const placeController = require("../controllers/placeController");

router
  .route("/")
  .get(placeController.index)
  .post(auth, placeController.uploadImage, placeController.createPlace);

router
  .route("/:placeId")
  .get(placeController.searchPlace)
  .put(placeController.replacePlace)
  .patch(placeController.updatePlace)
  .delete(placeController.deletePlace);

module.exports = router;

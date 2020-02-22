const express = require("express");
const router = express.Router();

const placeController = require("../controllers/placeController");

router
  .route("/")
  .get(placeController.index)
  .post(placeController.createPlace);

router.route("/:id").get(placeController.searchPlace);

module.exports = router;

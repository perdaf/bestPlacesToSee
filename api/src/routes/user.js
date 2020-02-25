const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.index)
  .post(userController.createUser);

router.route("/:id").get(userController.searchUser);

module.exports = router;

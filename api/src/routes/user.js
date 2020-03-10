const express = require("express");
const router = express.Router();

const { auth } = require("../sharing/verifiedToken");
const userController = require("../controllers/userController");

router
  .route("/:userId")
  .get(userController.searchUser)
  .delete(auth, userController.deleteUser);

router.route("/login").post(userController.loginUser);

router
  .route("/")
  .get(userController.index)
  .post(userController.createUser);

module.exports = router;

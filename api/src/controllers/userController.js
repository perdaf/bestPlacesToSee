const userEntity = require("../models/user");
const placeEntity = require("../models/place");
const commentEntity = require("../models/comment");

const helper = require("../controllers/helpers");

const validation = require("../sharing/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  // ---------- liste all the users ----------
  index: async (req, res, next) => {
    try {
      const result = await userEntity.find();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // ---------- seache user by Id ------------
  searchUser: async (req, res, next) => {
    const userId = req.params.id;
    try {
      const result = await userEntity
        .findById(userId)
        .populate("place", "name")
        .populate("comment", "contente");
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({ msg: "user not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  // -------- Create user ----------
  createUser: async (req, res, next) => {
    const { error } = validation.registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // checking if user email already exist
    const emailExist = await userEntity.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json({ msg: "email already exist" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new userEntity({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    // -- save user in DB --
    try {
      await newUser.save();
    } catch (error) {
      next(error);
    }

    // create and assigne a token
    const token = jwt.sign(
      {
        _id: newUser._id,
        name: newUser.name,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    // -- return res --
    res.status(201).json({ userId: newUser._id, email: newUser.email, token });
  },

  // ---------- Login a user ------------
  loginUser: async (req, res, next) => {
    const { error } = validation.loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // checking if user email already exist
    const user = await userEntity.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ msg: "user dosen't exist" });

    // check for password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ msg: "password invalide" });

    // create and assigne a token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res
      .header("auth-token", token)
      .status(200)
      .json({ msg: "log in", token: token });
  },

  // ------------ Delete a user ---------------
  deleteUser: async (req, res, next) => {
    const { userId } = req.params;

    // _TODO: limit acces to same user or admin (create role for user)
    if (req.user._id) {
      try {
        const user = await userEntity.findById(userId);

        // -- delete associated place and image
        user.place.forEach(async plc => {
          await placeEntity.findById(plc, (err, pl) => {
            if (err) return next(err);
            if (pl) {
              helper.deleteImage(pl.image, helper.getUrl(req));
              pl.remove();
            }
          });
        });

        // -- delete associated comment --
        user.comment.forEach(async cmts => {
          await commentEntity.findById(cmts, (err, cmt) => {
            if (err) return next(err);
            if (cmt) {
              cmt.remove();
            }
          });
        });

        // -- delete the user --
        await userEntity.findByIdAndDelete(userId, (err, userDeleted) => {
          res.status(200).json({ msg: "user deleted", userDeleted });
        });
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).json({ msg: "you are not allow to delete this user" });
    }
  },
};

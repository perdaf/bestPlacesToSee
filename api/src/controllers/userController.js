const userEntity = require("../models/user");
const validation = require("../validation");

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
      const result = await userEntity.findById(userId);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  // -------- Create user ----------
  createUser: async (req, res, next) => {
    const { error } = validation.registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const newUser = new userEntity(req.body);
    try {
      const result = await newUser.save();
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
};

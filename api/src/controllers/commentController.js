const commentEntity = require("../models/comment");

module.exports = {
  // ---------- liste all the comment ----------
  index: async (req, res, next) => {
    try {
      const result = await commentEntity.find();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // ---------- seache comment by Id ------------
  searchComment: async (req, res, next) => {
    const userId = req.params.id;
    try {
      const result = await commentEntity.findById(userId);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  // -------- Create comment ----------
  //   createComment: async (req, res, next) => {
  //     const newUser = new commentEntity(req.body);
  //     try {
  //       const result = await newUser.save();
  //       res.status(201).json(result);
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
};

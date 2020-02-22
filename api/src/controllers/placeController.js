const placeEntity = require("../models/place");

module.exports = {
  index: async (req, res, next) => {
    try {
      const result = await placeEntity.find();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  createPlace: async (req, res, next) => {
    try {
      const newPlace = placeEntity.create();
    } catch (error) {}
    res.status(200).json({ msg: "create a place", body: req.body });
  },
};

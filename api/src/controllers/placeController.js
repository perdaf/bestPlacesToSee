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

  searchPlace: async (req, res, next) => {
    const placeId = req.params.id;
    try {
      const result = await placeEntity.findById(placeId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  createPlace: async (req, res, next) => {
    try {
      const newPlace = new placeEntity(req.body);
      const result = await newPlace.save();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

const placeEntity = require("../models/place");
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload/");
  },
  filename: (req, file, cb) => {
    console.log("file >>>", file);
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    cb(null, Date.now() + name);
  },
});

const upload = multer({ storage: storage }).single("image");
// const upload = multer({ dest: "public/upload/" }).single("image");

module.exports = {
  // ---------- list all the place ---------------
  index: async (req, res, next) => {
    try {
      const result = await placeEntity.find();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // ----------- search a single place -----------------
  searchPlace: async (req, res, next) => {
    const placeId = req.params.id;
    try {
      const result = await placeEntity.findById(placeId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // --------- upload image ---------
  uploadImage: async (req, res, next) => {
    try {
      upload(req, res, next); // need this signature to work !!! wtf
    } catch (error) {
      next(error);
    }
  },

  // ------------ create a place -------------
  createPlace: async (req, res, next) => {
    const newPlace = new placeEntity(req.body);
    if (req.file) {
      const file = req.file;
      const imageUrl = `${req.protocol}://${req.get("host")}/public/upload/${
        file.filename
      }`;
      newPlace.image = imageUrl;
    }
    try {
      const result = await newPlace.save();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

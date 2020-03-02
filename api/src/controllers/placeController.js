const placeEntity = require("../models/place");
const userEntity = require("../models/user");
const commentEntity = require("../models/comment");

const multer = require("multer");
const fs = require("fs");
const validation = require("../validation");

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
    // console.log("file >>>", file);
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
    const { placeId } = req.params;
    try {
      const result = await placeEntity
        .findById(placeId)
        .populate("comment", "contente");
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({ msg: "place not found" });
      }
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
    const { error } = validation.placeValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const newPlace = new placeEntity(req.body);
    // -- search for the user and save place
    const { _id } = req.user;
    if (_id) {
      const user = await userEntity.findById(_id);
      user.place.push(newPlace);
      try {
        await user.save();
        newPlace.user = user;
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).json({ msg: "user not found" });
    }
    // -- process the image
    if (req.file) {
      const file = req.file;
      const imageUrl = `${req.protocol}://${req.get("host")}/public/upload/${
        file.filename
      }`;
      newPlace.image = imageUrl;
    }
    // -- save the place
    try {
      const result = await newPlace.save();
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  // ------- replace place (all fields needed) -------
  // replacePlace: async (req, res, next) => {
  //   const { placeId } = req.params;
  //   const newPlace = req.body;
  //   try {
  //     const result = await placeEntity.findByIdAndUpdate(placeId, newPlace);
  //     res.status(200).json({ msg: "place succefully replaced" });
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  // ------- edit place (some fields needed) -------
  updatePlace: async (req, res, next) => {
    const { placeId } = req.params;
    const newPlace = req.body;

    try {
      let nbPlace;
      await placeEntity.countDocuments({ _id: placeId }, (err, count) => {
        if (err) return res.status(400).json(err);
        nbPlace = count;
      });
      if (nbPlace >= 1) {
        await placeEntity.findByIdAndUpdate(placeId, newPlace);
        res.status(201).json({ msg: "place succefully replaced" });
      } else {
        res.status(400).json({ msg: "place id not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  // ---------- delete place and image -------------
  deletePlace: async (req, res, next) => {
    const { placeId } = req.params;
    const userId = req.user._id;
    try {
      const place = await placeEntity.findById(placeId);

      if (!place) {
        res.status(400).json({ msg: "place not found" });
        return;
      }
      if (place.user == userId) {
        // -- delete comments[] --
        place.comment.forEach(async cmt => {
          await commentEntity.findByIdAndDelete(cmt);
        });
        // TODO: delete comment in respective user

        // -- delete place in user.place[] ---
        const user = await userEntity.findById(place.user);
        if (user) {
          const filter = user.place.filter(plc => plc != place._id);
          user.place = filter;
          await user.save();
        }

        // -- delete image in folder --
        // TODO: move this code in middleware trigger by remove place
        const imgUrl = place.image.replace(
          `${req.protocol}://${req.get("host")}/`,
          ""
        );
        fs.stat(imgUrl, (err, stats) => {
          if (err) {
            return console.error("image not found in folder");
          }
          fs.unlink(imgUrl, err => {
            if (err) return console.error(err);
            console.log("file deleted succefully");
          });
        });

        // -------- delete in DB ---------------
        placeEntity.findById(placeId, (err, place) => {
          if (err) return next(err);
          place.remove((err, removedPLace) => {
            if (err) return next(err);
            res.status(200).json({ msg: "place deleted succesfully", place });
          });
        });
      } else {
        res
          .status(400)
          .json({ msg: "you are not allowed to delete this place" });
      }
    } catch (error) {
      next(error);
    }
  },

  // -- Delete comment --
  deleteComment: async (req, res, next) => {
    const { cmtId } = req.params;
    const { placeId } = req.params;
    const userId = req.user._id;

    // -- retrive comment --
    try {
      const cmt = await commentEntity.findById(cmtId);
      if (cmt && (cmt.user = userId)) {
        // -- retrive and delete the comment in user.comment[]
        const user = await userEntity.findById(userId);
        listeUserCmt = user.comment;

        let filteredCmtUser = listeUserCmt.filter(id => id != cmtId);
        user.comment = filteredCmtUser;
        await user.save();
        // console.log("listeUserCmt >>>", listeUserCmt);
        // console.log("liste filtered >>>", filtered);

        // -- retrive and delete the comment id in place.comment[]
        const place = await placeEntity.findById(placeId);
        listePlaceCmt = place.comment;

        let filteredCmtPlace = listePlaceCmt.filter(id => id != cmtId);
        place.comment = filteredCmtPlace;
        await place.save();

        // -- retrive and delete the comment
        await commentEntity.findByIdAndDelete(cmtId);
        res.status(201).json({ msg: "comment deleted" });
      } else {
        res
          .status(400)
          .json({ msg: "user not authorised to delete this comment" });
      }
    } catch (error) {
      next(error);
    }
  },
};

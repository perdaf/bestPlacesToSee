const commentEntity = require("../models/comment");
const userEntity = require("../models/user");
const placeEntity = require("../models/place");

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
    const { cmtId } = req.params;
    try {
      const result = await commentEntity
        .findById(cmtId)
        .populate("user", "name")
        .populate("place", "name");
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({ msg: "comment not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  // -------- Create comment ----------
  createComment: async (req, res, next) => {
    // -- create the comment object
    const newComment = new commentEntity(req.body);

    // -- search for the user and save comment in user
    const { _id } = req.user;
    if (_id) {
      const user = await userEntity.findById(_id);
      user.comment.push(newComment);
      try {
        await user.save();
        newComment.user = user;
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).json({ msg: "user not found, you can't post comment" });
    }

    // -- search for the place and save comment in place
    const { placeId } = req.params;
    if (placeId) {
      const place = await placeEntity.findById(placeId);
      place.comment.push(newComment);
      try {
        await place.save();
        newComment.place = place;
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).json({ msg: "place not found" });
    }

    // save the comment
    try {
      await newComment.save();
      res.status(201).json({
        msg: "comment save",
        content: newComment.contente,
        place: placeId,
        user: req.user.name,
      });
    } catch (error) {
      next(error);
    }
  },

  // -- update comment --
  updateComment: async (req, res, next) => {
    const { cmtId } = req.params;
    const newCmt = req.body;

    try {
      let nbCmt;
      await commentEntity.countDocuments({ _id: cmtId }, (err, count) => {
        if (err) return res.status(400).json(err);
        console.log("count >>>", count);
        nbCmt = count;
      });
      if (nbCmt >= 1) {
        await commentEntity.findByIdAndUpdate(cmtId, newCmt);
        res.status(201).json({ msg: "comment succefully change" });
      } else {
        res.status(400).json({ msg: "comment id not found" });
      }
    } catch (error) {
      next(error);
    }
  },
};

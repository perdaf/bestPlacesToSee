const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    try {
      let token;
      if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        throw new Error("Access denied");
      }
      // return res.status(401).json({ msg: "Access denied" });
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decodedToken;
      next();
    } catch (error) {
      next(error);
    }
  },
};

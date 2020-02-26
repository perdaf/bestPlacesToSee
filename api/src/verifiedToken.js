const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ msg: "Access denied" });

    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      next(error);
    }
  },
};

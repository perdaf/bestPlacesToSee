module.exports = {
  notFound: (req, res, next) => {
    const error = new Error(`not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  },

  errorHandler: (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      msg: error.message,
      stack:
        process.env.NODE_ENV == "production"
          ? "prod mod! -> stack disable"
          : error.stack,
    });
  },
};

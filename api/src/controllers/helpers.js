const fs = require("fs");
const url = require("url");

module.exports = {
  deleteImage: (img, url) => {
    console.log("entrer deleteImage function helper");
    const imgUrl = img.replace(url, "");

    fs.stat(imgUrl, (err, stats) => {
      // console.log("stats >>>", stats);

      if (err) return console.error("image not found in folder");
      fs.unlink(imgUrl, err => {
        if (err) return console.error(err);
        console.log("file deleted succefully");
      });
    });
  },

  getUrl: req => {
    return `${req.protocol}://${req.get("host")}/`;
    // return url.format({
    //   protocol: req.protocol,
    //   host: req.get("host"),
    //   pathname: req.originalUrl,
    // });
  },
};

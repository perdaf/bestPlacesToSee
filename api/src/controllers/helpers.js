const fs = require("fs");

const getUrl = (req, res) => {
  return `${req.protocol}://${req.get("host")}/`;
};

module.exports = {
  deleteImage: img => {
    console.log("entrer deleteImage function helper");
    console.log("req >>>", req);
    const imgUrl = img.replace(getUrl(), "");
    // const imgUrl = img.replace(`http://localhost:3000`, "");
    console.log("imgUrl >>>", imgUrl);

    fs.stat(imgUrl, (err, stats) => {
      console.log("stats >>>", stats);

      if (err) return console.error("image not found in folder");
      fs.unlink(imgUrl, err => {
        if (err) return console.error(err);
        console.log("file deleted succefully");
      });
    });
  },
};

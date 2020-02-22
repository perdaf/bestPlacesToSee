const mongoose = require("mongoose");

//require chalk module to give colors to console text
const chalk = require("chalk");

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

//export this function and imported by server.js
module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }

  mongoose.connection.on("connected", () => {
    console.log(
      connected("Mongoose default connection is open to ", process.env.DB_URL)
    );
  });

  mongoose.connection.on("error", err => {
    console.log(
      error("Mongoose default connection has occured " + err + " error")
    );
  });

  mongoose.connection.on("disconnected", () => {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(function() {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });
};

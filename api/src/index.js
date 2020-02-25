const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middleware = require("./sharing/middleware");
const db = require("./config/db");
require("dotenv").config();
//----- routes ---------
const placesRoute = require("./routes/place");
const usersRoute = require("./routes/user");
const commentRoute = require("./routes/comment");

//-----------
const app = express();

// --------- body parser ----------
app.use(express.json());

//------ initiate variables ------
const PORT = process.env.PORT || 3000;

//------- middleware ------
app.use(morgan("common"));
// secure the header
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGINE,
  })
);

//-------- connect to db ----------
db();

//-------- Static file ---------
app.use("/public", express.static("public"));

// --------- routes ----------
app.get("/", (req, res) => {
  res.json({ msg: "page /" });
});

app.use("/api/place", placesRoute);
app.use("/api/user", usersRoute);
app.use("/api/comment", commentRoute);

// ---- 404 handle and error handle ----
app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listen on port : ${PORT}`);
});

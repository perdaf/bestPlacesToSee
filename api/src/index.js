const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middleware = require("./sharing/middleware");
const db = require("./config/db");
require("dotenv").config();
//----- routes ---------
const placesRoute = require("./routes/place");

//-----------
const app = express();

//------ initiate variables ------
const PORT = process.env.PORT || 3000;

//------- middleware ------
app.use(morgan("common"));
// secure the header
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:*",
  })
);
app.use(express.json());

//-------- connect to db ----------
db();
// --------- routes ----------
app.get("/", (req, res) => {
  res.json({ msg: "page /" });
});

app.use("/api/place", placesRoute);

// ---- 404 handle and error handle ----
app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listen on port : ${PORT}`);
});

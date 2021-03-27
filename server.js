const express = require("express");
const app = express();

const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");

// router
const router = require("./src/routes");

// variable
const port = process.env.PORT || 5000;

// body parser
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

//route
app.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname + "/uploads/index.html"));
});

app.use("/api/v1/", router);

// server listen
app.listen(port, () => console.log(`server running at port ${port}`));

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// router
const router = require("./src/routes");

// variable
const port = process.env.PORT || 5000;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route
app.use("/api/v1/", router);

// server listen
app.listen(port, () => console.log(`server running at port ${port}`));

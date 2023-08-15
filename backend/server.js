const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes/characters");

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/characters", routes);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

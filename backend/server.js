import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const app = express();
import router from "./routes/characters.js";
import routes2 from "./routes/profiles.js";

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/characters", router);
app.use("/api/profiles", routes2);

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

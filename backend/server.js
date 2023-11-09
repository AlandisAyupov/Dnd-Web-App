import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const app = express();
import cRoutes from "./routes/characters.js";
import pRoutes from "./routes/profiles.js";

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/characters", cRoutes);
app.use("/api/profile", pRoutes);

//connection to server and database.
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

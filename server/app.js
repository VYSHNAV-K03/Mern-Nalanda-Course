// import express js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Product = require("./models/productModel");

// import cors
const cors = require("cors");

// create express app using express()
const app = express();

app.use(
  cors({
    origin: true,
  }),
);

//permission to accept json data
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/auth", require("./routes/authenticationRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/cart", require("./routes/cartRoutes"));

mongoose
  .connect(
    "mongodb+srv://g50218032_db_user:rxJZdQIMWTrXY8vs@cluster0.bmgdvlj.mongodb.net/?appName=Cluster0",
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((er) => {
    console.log(er);
  });

// app deploy on localhost in port 6000
app.listen(5000, () => {
  console.log("server listen on port 5000");
});

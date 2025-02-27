const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

// MongoDB connection
mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Failed to connect to MongoDB", error));

// Routes
app.use("/", adminRoutes);
app.use("/p", productRoutes);
app.use("/r", resourceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

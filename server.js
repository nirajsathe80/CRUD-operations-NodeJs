const express = require("express");
const dotEnv = require("dotenv").config();
const app = express();
const contactRoutes = require("./routes/contact");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const userRoutes = require("./routes/users");
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();

app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);

// Error handlers
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

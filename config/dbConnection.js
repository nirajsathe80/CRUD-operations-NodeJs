const mongoose = require("mongoose");

const connectDB = async function () {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Connected to Mongoose",
      connect.connection.host,
      connect.connection.port
    );
  } catch (err) {
    console.log("Connecton error: " + err);
    process.exit(1);
  }
};

module.exports = connectDB;

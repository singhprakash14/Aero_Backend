const mongoose = require("mongoose");

const connectToMongoDb = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGO_DB_URI); // Log the URI
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB..");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongoDb;

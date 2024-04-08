require('dotenv').config();
const express = require("express");
const authRoutes = require("./routes/auth.routes.js");
const connectToMongoDb = require("./config/db.js");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.use("/api/auth", authRoutes);



app.listen(PORT, async () => {
  await connectToMongoDb();
  console.log(`Server running on port ${PORT}`);
});
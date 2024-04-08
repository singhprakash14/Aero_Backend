const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: "string",
      required: true,
    },
    username: {
      type: "string",
      required: true,
      unique: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
      minLength: 6,
    },
    profilePic: {
      type: "string",
      default: "",
    },
    location: {
      type: "string",
      default: "",
    },
    is_verified: {
      type: "boolean",
      default: false,
    },
    whyOnDribble: {
      type: [Object],
      default: [],
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

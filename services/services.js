const bcrypt = require("bcryptjs");
const User = require("./../models/user.model.js");
const { generateTokenAndSetCookie } = require("../utils/generateToken.js");
const { sendVerificationMail } = require("../emailVerification/sendVerificationMail.js");

async function signup(userData) {
  try {
    const { fullName, username, email, password } = userData;

    let user = await User.findOne({ username });
    if (user) {
      return { error: "Username already exists" };
    }

    user = await User.findOne({ email });
    if (user) {
      return { error: "Email already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    await sendVerificationMail(newUser.fullName, newUser.email, newUser._id);

    const tokenResponse = generateTokenAndSetCookie(newUser._id);
    return { data: { ...newUser._doc, token: tokenResponse.token } };
  } catch (error) {
    console.log("Error in signup service", error.message);
    return { error: "Internal Server Error" };
  }
}

async function verifyEmail(id) {
  try {
    const updatedUser = await User.updateOne(
      { _id: id },
      { $set: { is_verified: true } }
    );
    return { data: { updatedUser } };
  } catch (error) {
    console.log("Error in verifying email", error.message);
    return { error: "Internal Server Error" };
  }
}

async function login(username, password) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return { error: "Invalid Username or Password" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return { error: "Invalid Username or Password" };
    }

    const tokenResponse = generateTokenAndSetCookie(user._id);
    return {
      data: { ...user._doc, token: tokenResponse.token }
    };
  } catch (err) {
    console.log("Error in login service.. ", err.message);
    return { error: "Internal server error" };
  }
}

async function logout() {
  try {
    return { message: "Logged out successfully" };
  } catch (err) {
    console.log("Error in logout service.. ", err.message);
    return { error: "Internal server error" };
  }
}

async function resendVerificationMail(id) {
  try {
    const user = await User.findOne({ _id: id });
    const email = user.email;
    const name = user.fullName;
    await sendVerificationMail(name, email, id);
    return { message: "Verification mail sent successfully" };
  } catch (error) {
    console.log("Error in resend service.. ", error.message);
    return { error: "Internal server error" };
  }
}

async function roleSelect(id, data) {
  try {
    const updated = await User.updateOne(
      { _id: id },
      { $set: { whyOnDribble: Object.values(data) } }
    );
    return { message: "Role updated", updated };
  } catch (error) {
    console.log("Error in Role updation service..", error.message);
    return { error: "Internal server error" };
  }
}

async function updateLocation(id, location) {
  try {
    const updated = await User.updateOne(
      { _id: id },
      { $set: { location: location } }
    );

    if (updated.modifiedCount === 0) {
      return { error: "Location could not be updated" };
    }

    return { message: "Location updated successfully" };
  } catch (error) {
    console.log("Error in update profile service..", error.message);
    return { error: "Internal server error" };
  }
}

module.exports = {
  signup,
  verifyEmail,
  login,
  logout,
  resendVerificationMail,
  roleSelect,
  updateLocation
};

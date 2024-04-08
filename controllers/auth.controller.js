const userService = require('../services/services');

exports.signup = async (req, res) => {
  try {
    const userData = req.body;
    const result = await userService.signup(userData);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json({ data: result.data });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await userService.verifyEmail(id);
    res.status(201).json({ data: result.data });
  } catch (error) {
    console.log("Error in verifying email", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await userService.login(username, password);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ data: result.data });
  } catch (err) {
    console.log("Error in login controller.. ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const result = await userService.logout();
    res.status(200).json({ message: result.message });
  } catch (err) {
    console.log("Error in logout controller.. ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.resendVerificationMail = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await userService.resendVerificationMail(id);
    res.status(200).json({ message: result.message });
  } catch (error) {
    console.log("Error in resend controller.. ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.roleSelect = async (req, res) => {
  try {
    const id = req.query.id;
    const data = req.body;
    const result = await userService.roleSelect(id, data);
    res.status(200).json({ message: result.message });
  } catch (error) {
    console.log("Error in Role updation controller..", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const id = req.query.id;  
    const { location } = req.body;
    const result = await userService.updateLocation(id, location);
    res.status(200).json({ message: result.message });
  } catch (error) {
    console.log("Error in update profile controller..", error.message); 
    res.status(500).json({ error: "Internal server error" });
  }
};

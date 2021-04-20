// import model below
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../response");

// function for controller
exports.Registration = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const saltHashStrength = 10;
    const hashPassword = await bcrypt.hash(password, saltHashStrength);

    const register = await User.create({
      fullName: fullName,
      gender: gender,
      email: email,
      password: hashPassword,
      phone: phone,
      role: role,
      image: process.env.URL_IMAGE_DEFAULT,
      location: process.env.LOCATION,
    });

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: register.id }, secretKey);

    const result = {
      user: {
        id: register.id,
        fullName: register.fullName,
        email: register.email,
        token: token,
        role: register.role,
      },
    };

    response.ok(res, result, 200, "successfully registered user");
  } catch (error) {
    response.error(res, error, 401, "failed register user");
    console.log(error);
  }
};

// import model below
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../response");

// function for controller
exports.registration = async (req, res) => {
  try {
    const { fullName, gender, email, password, phone, role } = req.body;

    const saltHashStrength = 10;
    const hashPassword = await bcrypt.hash(password, saltHashStrength);

    const register = await User.create({
      fullName: fullName,
      gender: gender,
      email: email,
      password: hashPassword,
      phone: phone,
      role: role,
    });

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: register.id }, secretKey);

    const result = {
      user: {
        id: register.id,
        fullName: register.fullName,
        token: token,
        role: register.role,
      },
    };

    response.ok(result, res);
  } catch (error) {
    response.error(error, res);
    console.log(error);
  }
};

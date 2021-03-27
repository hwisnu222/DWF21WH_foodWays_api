// import model below
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const response = require("../response");

// function for controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const schemaLogin = Joi.object({
    email: Joi.string().email().min(10).max(30).required(),
    password: Joi.string().min(6).max(50).required(),
  });

  const { error } = schemaLogin.validate({ email, password });

  if (error) return response.error(res, null, 200, error.details[0].message);

  try {
    const login = await User.findOne({
      where: { email: email },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!login)
      return response.error(res, null, 200, "user or password not exist");

    const compareHash = await bcrypt.compare(password, login.password);
    console.log(compareHash);

    if (!compareHash) {
      return response.error(res, null, 200, "user or password wrong");
    }

    const secretKey = process.env.SECRET_KEY;
    console.log(secretKey);
    const token = jwt.sign({ id: login.id }, secretKey);

    const result = {
      user: login,
      token,
    };

    response.ok(res, result, 200, "success login user");
  } catch (error) {
    console.log(error);
    response.error(res, error, 401, "failed login user");
  }
};

exports.checkAuth = async (req, res) => {
  const userId = req.userId;

  try {
    const login = await User.findOne({
      where: { id: userId },
      attributes: ["id", "email", "role"],
    });

    if (!login) {
      return response.error(res, error, 200, "user not exist");
    }

    const result = {
      user: login,
    };

    response.ok(res, result, 200, "success login user");
  } catch (error) {
    console.log(error);
    response.error(res, error, 401, "failed login user");
  }
};

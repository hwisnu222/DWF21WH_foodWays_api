// import model below
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const response = require("../response");

// function for controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const saltHashStrength = 10;
  const hashPassword = await bcrypt.hash(password, saltHashStrength);

  try {
    const login = await User.findOne({
      where: { email: email },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    console.log(login);
    const compareHash = await bcrypt.compare(password, login.password);
    console.log(compareHash);

    if (!compareHash) {
      return response.error("user or password wrong", res);
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
    response.error(res, error, 401, "error on the server!!!");
  }
};

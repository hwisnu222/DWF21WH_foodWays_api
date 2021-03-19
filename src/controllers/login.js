// import model below
const { Login } = require("../../models");
const response = require("../response");

// function for controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const login = await Login.findOne({
      where: { email: email, password: password },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    const result = {
      user: login,
    };

    response.ok(result, res);
  } catch (error) {
    response.error(error, res);
  }
};

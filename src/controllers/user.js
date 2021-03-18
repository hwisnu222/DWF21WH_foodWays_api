"use strict";

// import model below
const { User } = require("../../models/");
const response = require("../response");

// function for controller
exports.getAllUsers = async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const result = { users: userData };

    response.ok(result, res);
  } catch (error) {
    console.log(error);
  }
};

// delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = User.destroy({
      where: {
        id,
      },
    });

    response.ok(deleteUser, res);
  } catch (error) {
    response.error("can't delete user", res);
  }
};

"use strict";

// import model below
const { User } = require("../../models/");
const bcrypt = require("bcrypt");
const response = require("../response");

// function for controller
// function for controller
exports.getDetailUsers = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  try {
    const userData = await User.findOne({
      attributes: {
        exclude: ["gender", "password", "createdAt", "updatedAt"],
      },
      where: { id: userId },
    });

    const result = { users: userData };

    response.ok(res, result, 200, "successfully get detail user");
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ["gender", "password", "createdAt", "updatedAt"],
      },
      offset: 4,
      limit: 4,
    });

    const result = { users: userData };

    response.ok(res, result, 200, "successfully get all user");
  } catch (error) {
    response.ok(res, error, 401, "failed get detail user");
  }
};

exports.getPartner = async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: ["id", "fullName", "image"],
      offset: 4,
      limit: 4,
      where: { role: "partner" },
    });

    const result = { users: userData };

    response.ok(res, result, 200, "successfully get all partner");
  } catch (error) {
    response.ok(res, error, 401, "failed get detail partner");
  }
};

// edit user
exports.updateUser = (req, res) => {
  const userId = req.userId;
  const { fullName, gender, email, phone, location } = req.body;
  const imageName = req.files.imageFile[0].filename;
  const url = process.env.URL;

  try {
    const updateUser = User.update(
      {
        fullName,
        gender,
        email,
        phone,
        location,
        image: url + imageName,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    const result = { id: userId };

    response.ok(res, result, 200, "successfully update user");
  } catch (error) {
    response.error(res, null, 401, "can't update user");
  }
};

// reset password user
exports.resetPasswordUser = async (req, res) => {
  const { userId } = req.params;
  const { passwordOld, passwordNew } = req.body;

  try {
    const saltHashStrength = 10;
    const hashPassword = await bcrypt.hash(passwordNew, saltHashStrength);

    const checkPassword = await User.findOne({ where: { id: userId } });

    const compareHash = await bcrypt.compare(
      passwordOld,
      checkPassword.password
    );
    console.log(!compareHash);

    if (!compareHash) {
      return response.error("your old password not correct!!", res);
    }

    const updateUser = User.update(
      {
        password: hashPassword,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    const result = { id: userId };

    response.ok(res, result, 200, "successfully reset user password");
  } catch (error) {
    response.ok(res, error, 401, "failed reset user password");
  }
};

// delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = User.destroy({
      where: {
        id: id,
      },
    });
    const result = { id: id };

    response.ok(res, result, 200, "successfully delete user");
  } catch (error) {
    response.ok(res, error, 401, "failed reset user password");
  }
};

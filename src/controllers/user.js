"use strict";

// import model below
const { User } = require("../../models/");
const bcrypt = require("bcrypt");
const response = require("../response");

// function for controller
exports.getAllUsers = async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ["gender", "password", "createdAt", "updatedAt"],
      },
    });

    const result = { users: userData };

    response.ok(result, res);
  } catch (error) {
    console.log(error);
  }
};

// edit user
exports.updateUser = (req, res) => {
  const { userId } = req.params;
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
    response.error(res, [], 401, "can't update user");
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
    const result = { id: userId, message: "Success for reset password" };

    response.ok(result, res);
  } catch (error) {
    response.error("can't delete user", res);
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

    response.ok(result, res);
  } catch (error) {
    response.error("can't delete user", res);
  }
};

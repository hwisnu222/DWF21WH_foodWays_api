const { User } = require("../../models");
const response = require("../response");

exports.checkRole = {
  partner: async (req, res, next) => {
    try {
      const id = req.userId;

      const user = await User.findOne({
        where: { id },
      });
      console.log(user.role);

      if (user.role == "partner") {
        next();
      } else {
        response.error(res, null, 200, "role not allowed!!!");
      }
    } catch (error) {
      response.error(res, null, 200, "can't verify role!");
    }
  },

  user: async (req, res, next) => {
    try {
      const id = req.userId;

      const user = await User.findOne({
        where: { id },
      });

      if (user.role == "user") {
        next();
      } else {
        response.error(res, null, 200, "role not allowed!!!");
      }
    } catch (error) {
      response.error(res, null, 200, "can't verify role!");
    }
  },
};

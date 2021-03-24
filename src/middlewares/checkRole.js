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
        response.error("role not allowed!!!", res);
      }
    } catch (error) {
      response.error("can't verify role", res);
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
        response.error("role not allowed!!!", res);
      }
    } catch (error) {
      response.error("can't verify role", res);
    }
  },
};

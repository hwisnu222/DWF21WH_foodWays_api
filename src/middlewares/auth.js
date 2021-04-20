const jwt = require("jsonwebtoken"),
  response = require("../response");

exports.authentication = (req, res, next) => {
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return response.error(res, null, 200, "Access Denied!!");
  }

  try {
    const secretKey = process.env.SECRET_KEY;
    const verified = jwt.verify(token, secretKey);

    req.userId = verified.id;

    next();
  } catch (error) {
    return response.error(res, null, 400, "can't verify token");
  }
};

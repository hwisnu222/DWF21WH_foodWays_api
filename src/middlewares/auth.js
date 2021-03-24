const jwt = require("jsonwebtoken"),
  response = require("../response");

exports.authentication = (req, res, next) => {
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return response.authError("Access Denied!!!", res);
  }

  try {
    const secretKey = process.env.SECRET_KEY;
    const verified = jwt.verify(token, secretKey);

    req.userId = verified.id;

    next();
  } catch (error) {
    response.authError("can't verify token", res);
  }
};

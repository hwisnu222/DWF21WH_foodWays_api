const Response = require("../response");

exports.index = (req, res) => {
  const data = "welcome to restfull api for foodways app";
  Response.ok(data, res);
};

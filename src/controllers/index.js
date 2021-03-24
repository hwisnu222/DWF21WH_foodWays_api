const response = require("../response");

exports.index = (req, res) => {
  const data = "welcome to restfull api for foodways app";
  response.ok(res, data, 200, "success load restfull foodways API");
};

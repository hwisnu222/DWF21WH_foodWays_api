"use strict";

exports.ok = (result, res) => {
  const data = {
    status: "success",
    data: result,
  };

  res.send(data);
};

exports.error = (error, res) => {
  const data = {
    status: "failed",
    data: error,
  };

  res.send(data);
};

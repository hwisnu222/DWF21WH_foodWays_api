"use strict";

exports.ok = (result, res) => {
  const data = {
    status: "success",
    data: result,
  };

  res.json(data);
  res.end();
};

exports.error = (error, res) => {
  const data = {
    status: "failed",
    data: error,
  };

  res.json(data);
  res.end();
};

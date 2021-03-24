"use strict";

exports.ok = (res, result, code, message) => {
  const data = {
    status: "success",
    message: message,
    data: result,
  };

  res.status(code).send(data);
};

exports.error = (res, error, code, message) => {
  const data = {
    status: "failed",
    message: message,
    data: error,
  };

  res.status(code).send(data);
};

exports.authError = (result, res) => {
  const data = {
    status: "failed",
    message: result,
  };
  res.status(401).send(data);
};

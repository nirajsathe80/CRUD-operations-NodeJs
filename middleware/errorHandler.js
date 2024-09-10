const errorCodes = require("../contant");

const errorHandler = function (err, req, res, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case errorCodes.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        status: statusCode,
        message: err.message,
      });
      break;

    case errorCodes.NOT_FOUND:
      res.json({
        title: "Not Found",
        status: statusCode,
        message: err.message,
      });
      break;

    case errorCodes.FORBIDEN:
      res.json({
        title: "Forbidden",
        status: statusCode,
        message: err.message,
      });
      break;

    case errorCodes.UNAUTHERISED:
      res.json({
        title: "Unauthorized",
        status: statusCode,
        message: err.message,
      });
      break;

    default:
      break;
  }
};

module.exports = errorHandler;

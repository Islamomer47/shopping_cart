// Success response
exports.successResponse = (res, data, message = "Success") => {
  return res.status(200).json({
    success: true,
    message: message,
    data: data,
  });
};

// Error response
exports.errorResponse = (
  res,
  message = "An error occurred",
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

// Validation error response
exports.validationErrorResponse = (res, errors) => {
  return res.status(400).json({
    success: false,
    message: "Validation errors occurred",
    errors: errors,
  });
};

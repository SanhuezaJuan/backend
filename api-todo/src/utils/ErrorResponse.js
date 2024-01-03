export const ErrorResponse = (message, res, code = 400) => {
  return res.status(code).json({
    error: true,
    message,
  });
};

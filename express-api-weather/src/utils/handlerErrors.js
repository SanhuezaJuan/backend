export const handleErrors = async (res, message, statusCode = 400) => {
  res.status(statusCode).json({
    error: true,
    message,
  });
};

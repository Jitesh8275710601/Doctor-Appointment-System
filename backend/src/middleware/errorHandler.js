export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `A service with this ${field} already exists`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  const isDev = process.env.NODE_ENV === "development";

  res.status(statusCode).json({
    success: false,
    message,
    ...(isDev && { stack: err.stack }),
  });
};

const cors = require("cors");
const AppError = require("../utils/appError");

const origin1 = process.env.CLIENT_URL1;

const corsOptions = {
  origin: origin1,
  optionsSuccessStatus: 200,
};

const corsMiddleware = () => {
  if (!origin1) {
    throw new AppError("CLIENT_URL not defined", 500);
  }
  return cors(corsOptions);
};

module.exports = corsMiddleware;

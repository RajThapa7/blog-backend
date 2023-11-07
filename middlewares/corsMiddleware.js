const cors = require("cors");
const AppError = require("../utils/appError");

const origin1 = process.env.CLIENT_URL1;
// const origin2 = process.env.CLIENT_URL2;

var whitelist = [origin1];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new AppError("Not allowed by CORS", 5000));
    }
  },
  optionsSuccessStatus: 200,
};

const corsMiddleware = () => {
  if (!origin1) {
    throw new AppError("CLIENT_URL not defined", 500);
  }
  return cors(corsOptions);
};

module.exports = corsMiddleware;

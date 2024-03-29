require("./utils/db");
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const occupantRouter = require("./routes/occupants.route");
const apartmentRouter = require("./routes/apartments.route");
const stayRouter = require("./routes/stays.route");
const userRouter = require("./routes/users.route");
const cors = require("cors");
const configureSecurityMiddleware = require("./middleware/security");

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
};

configureSecurityMiddleware(app);

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      res.setHeader(
        "strict-transport-security",
        "max-age=31536000; includeSubDomains; preload"
      );
      next();
    }
  });
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).send("Legs API");
});

app.use("/occupants", occupantRouter);
app.use("/apartments", apartmentRouter);
app.use("/stays", stayRouter);
app.use("/users", userRouter);

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  if (!err.message) {
    err.message = "Something unexpected happened.";
  }
  res.status(err.statusCode).send(err.message);
  next();
});

module.exports = app;

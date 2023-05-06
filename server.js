const config = require("./app/config/config");
const port = config.port;
console.log(port);

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const open = require("open");
const connectDB = require("./app/utils/db").connectToDb;
app.use(express.json());
app.use(cookieParser());

//setUP CORS
app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, async () => {
  console.log(`EventHQ served: http://localhost:${port}/auth/signup`);
  await open(`http://localhost:${port}/auth/signup`);
});

// connect to db somewhere
connectDB();
console.log("Server: Connected to db::EventHQ");

app.use(express.static("./app/views"));

const authRoutes = require("./app/routes/authRoutes.js");
const privateRoutes = require("./app/routes/privateRoutes.js");
const publicRoutes = require("./app/routes/publicRoutes.js");

app.use("/", publicRoutes);
app.use("/auth", authRoutes);
app.use("/users", privateRoutes);

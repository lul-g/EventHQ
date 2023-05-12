const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const open = require("open");
const connectDB = require("./app/utils/db").connectToDb;
const cacheControl = require("express-cache-controller");

app.use(
  cacheControl({
    noCache: true,
  })
);
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
  console.log(`EventHQ served: http://localhost:${port}/`);
  await open(`http://localhost:${port}/`);
});

// connect to db somewhere
connectDB();
console.log("Server: Connected to db::EventHQ");

app.set("view engine", "ejs");
app.set("views", "./app/views/");

app.use(express.static("./app/views"));

const authRoutes = require("./app/routes/authRoutes.js");
const privateRoutes = require("./app/routes/privateRoutes.js");
const detailsRoutes = require("./app/routes/detailsRoutes.js");
const publicRoutes = require("./app/routes/publicRoutes.js");
const rootRoutes = require("./app/routes/adminRoutes.js").rootRouters;
const usersRoutes = require("./app/routes/adminRoutes.js").usersRouters;
const eventsRoutes = require("./app/routes/adminRoutes.js").eventsRouters;
const orgsRoutes = require("./app/routes/adminRoutes.js").orgsRouters;

app.use("/", publicRoutes);
app.use("/auth", authRoutes);
app.use("/users", privateRoutes);
app.use("/private", detailsRoutes);
app.use("/admin", rootRoutes);
app.use("/admin/users", usersRoutes);
app.use("/admin/events", eventsRoutes);
app.use("/admin/orgs", orgsRoutes);

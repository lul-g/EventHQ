const config = require("./app/config/config");
const port = config.port;
console.log(port);

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const open = require("open");

app.use(express.json());
app.use(cookieParser());

app.listen(port, async () => {
  console.log(`EventHQ served: http://localhost:${port}/auth/signup`);
  await open(`http://localhost:${port}/auth/signup`);
});

// connect to db somewhere

app.use(express.static("./app/views"));

const authRoutes = require("./app/routes/authRoutes.js");
const privateRoutes = require("./app/routes/privateRoutes.js");
const publicRoutes = require("./app/routes/publicRoutes.js");

app.use("/", publicRoutes);
app.use("/auth", authRoutes);
app.use("/users", privateRoutes);

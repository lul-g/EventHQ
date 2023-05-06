const express = require("express");
const app = express();

app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname, "views", "error.html"));
});

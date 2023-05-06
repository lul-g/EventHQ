const fs = require("fs");

function checkCookie(req, res, next) {
  const token = req.cookies["_cookie_"];
  if (token) {
    // The cookie is set and has a value
    console.log(`Token found: ${token}`);
    next();
  } else {
    // The cookie is not set or doesn't have a value
    console.log("Cookie not found");
    res
      .status(200)
      .send(fs.readFileSync("./app/views/error/unauthorized.html", "utf-8"));
  }
}

module.exports = { checkCookie };

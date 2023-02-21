const jwt = require("jsonwebtoken");
const { createError } = require("./error.js");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.redirect('/login')
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      console.log('login')
    } else {
      console.log('not admin')
    }
  });
};

module.exports = {verifyAdmin,verifyUser,verifyToken}
const { TanamanUser } = require("../models");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const { access_token } = req.headers;

  if (!access_token) {
    next({ name: "Token not found" });
    return;
  }

  try {
    req.userData = jwt.verify(access_token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const authorization = (req, res, next) => {
  const { id } = req.params;
  const userId = req.userData.id;

  TanamanUser.findByPk(id)
    .then((tanaman) => {
      if (!tanaman) {
        next({ name: "Data not found" });
      } else if (tanaman.UserId !== userId) {
        next({ name: "Unauthorized" });
      } else {
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { authentication, authorization };

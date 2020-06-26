const { TanamanUser } = require("../models");

class tanamanUsersController {
  static findAll(req, res, next) {
    TanamanUser.findAll()
      .then((data) => {
        console.log(data);
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = tanamanUsersController;

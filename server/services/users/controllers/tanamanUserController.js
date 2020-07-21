const { TanamanUser } = require("../models");

class tanamanUsersController {
  static findAll(req, res, next) {
    const UserId = req.userData.id;
    TanamanUser.findAll({
      where: { UserId },
      order: [["id", "asc"]]
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static create(req, res, next) {
    const UserId = req.userData.id;
    const { nama, umur_sekarang, form, resistance, gambar } = req.body;
    TanamanUser.create({
      nama,
      umur_sekarang,
      terakhir_disiram: new Date(),
      resistance,
      form,
      gambar,
      UserId,
    })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static findByPk(req, res, next) {
    const { id } = req.params;
    TanamanUser.findByPk(id)
      .then((result) => {
        if (!result) {
          next({ name: "Data not found" });
        } else {
          const { id, nama, umur_sekarang, terakhir_disiram, form, resistance, createdAt } = result;
          res
            .status(200)
            .json({ id, nama, umur_sekarang, terakhir_disiram, form, resistance, createdAt });
        }
      })
      .catch((err) => next(err));
  }

  static update(req, res, next) {
    const UserId = req.userData.id;
    const { id } = req.params;
    const { terakhir_disiram, umur_sekarang, form } = req.body
    TanamanUser.update(
      { terakhir_disiram, umur_sekarang, form },
      { where: { id } }
      )
      .then((data) => {
        res.status(200).json({successCode: `${data[0]}`});
      })
      .catch((err) => {
        next(err)
      });
  }

  static destroy(req, res, next) {
    const { id } = req.params;
    TanamanUser.destroy({ where: { id } })
      .then((result) => {
        if (result === 0 || result[0] === 0 || !result) {
          next({ name: "Data not found" });
        } else {
          res
            .status(200)
            .json({ successCode: `Successfully delete plant  with id ${id}` });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = tanamanUsersController;

const { TanamanUser } = require("../models");

class tanamanUsersController {
  static findAll(req, res, next) {
    const UserId = req.userData.id;
    TanamanUser.findAll({
      where: { UserId },
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
    // const terakhir_disiram = new Date();
    console.log(nama);
    // console.log(terakhir_disiram);
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
        console.log(data, "<<<<<<<<<<<");
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
          return;
        } else {
          const { id, nama, umur_sekarang, terakhir_disiram, form, resistance, createdAt } = result;
          console.log(result);
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
    console.log("1");
    TanamanUser.update(
      { terakhir_disiram, umur_sekarang, form },
      { where: { id } }
      )
      .then((data) => {
        console.log("2");
        res.status(200).json({successCode: `${data[0]}`});
      })
      .catch((err) => {
        console.log("3");
        next(err)
      });
  }

  static destroy(req, res, next) {
    const { id } = req.params;
    console.log("1");
    TanamanUser.destroy({ where: { id } })
      .then((result) => {
        console.log("2");
        if (result === 0 || result[0] === 0 || !result) {
          console.log("3");
          next({ name: "Data not found" });
          return;
        } else {
          res
            .status(200)
            .json({ successCode: `Successfully delete plant  with id ${id}` });
        }
      })
      .catch((err) => {
        console.log("4");
        next(err);
      });
  }
}

module.exports = tanamanUsersController;

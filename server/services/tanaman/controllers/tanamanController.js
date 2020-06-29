const {Tanaman} = require('../models')

class TanamanController{
  static getAllTanaman(req,res,next){
    Tanaman.findAll()
      .then(results => {
        res.status(200).json({
          tanaman: results
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  static addTanaman(req,res,next){
    const data = {
      nama: req.body.nama,
      umur: req.body.image_url,
      gambar: req.body.gambar,
      growth_rate: req.body.growth_rate,
      resistance: req.body.resistance,
    }
    Tanaman.create(data)
      .then(result => {
        res.status(201).json({tanaman: result})
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findTanaman(req,res,next){
    const { id } = req.params;
		Tanaman.findByPk(id)
			.then((result) => {
				if (result) {
					res.status(200).json({tanaman: result});
				} else {
					res.status(404).json({message : "DataNotFound"});
				}
			})
			.catch((err) => {
				console.log(err)
			});
  }

  static editTanaman(req,res,next){
    const { id } = req.params;
		const { nama, umur, gambar, growth_rate, resistance } = req.body;
		Tanaman.update(
			{ nama, umur, gambar, growth_rate, resistance },
      { where: { id: Number(id) }})
			.then((result) => {
				if (result == 1) {
					res.status(200).json({tanaman: result});
				} else {
					res.status(404).json({message : "DataNotFound"});
				}
			})
			.catch((err) => {
				console.log(err)
			});
  }

  static deleteTanaman(req,res,next){
    const { id } = req.params;
		Tanaman.destroy({ where: { id } })
			.then((result) => {
				if (result !== 0) {
					res.status(200).json({result});
				} else {
					res.status(404).json({message : "DataNotFound"});
				}
			})
			.catch((err) => {
				console.log(err)
			});
  }
}

module.exports = TanamanController
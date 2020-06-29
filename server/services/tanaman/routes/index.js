const router = require('express').Router()
const TanamanController = require('../controllers/tanamanController')

router.get('/', TanamanController.getAllTanaman)
router.post('/', TanamanController.addTanaman)
router.get('/:id', TanamanController.findTanaman)
router.put('/:id', TanamanController.editTanaman)
router.delete('/:id', TanamanController.deleteTanaman)


module.exports = router
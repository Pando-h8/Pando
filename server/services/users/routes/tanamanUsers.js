const router = require("express").Router();
const tanamanUser = require("../controllers/tanamanUserController");

router.get("/", tanamanUser.findAll);

module.exports = router;

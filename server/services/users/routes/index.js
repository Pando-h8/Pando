const router = require("express").Router();
const users = require("./Users");
const tanamanUser = require("./tanamanUsers");

router.use("/", users);
router.use("/tanamanUser", tanamanUser);

module.exports = router;

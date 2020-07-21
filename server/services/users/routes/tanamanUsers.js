const router = require("express").Router();
const tanamanUser = require("../controllers/tanamanUserController");
const { authentication, authorization } = require("../middlewares/auth");

router.use(authentication);
router.get("/", tanamanUser.findAll);
router.post("/", tanamanUser.create);
router.get("/:id", authorization, tanamanUser.findByPk);
router.put("/:id", authorization, tanamanUser.update);
router.delete("/:id", authorization, tanamanUser.destroy);

module.exports = router;

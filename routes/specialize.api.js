const router = require("express").Router();
const auth = require("../middleware/auth");
const upload1 = require("../middleware/upload");

const specializeController = require("../app/controller/specialize.controller")
router.post("/addSpecialize", auth, upload1.single("img"), specializeController.addSpecialize);
router.put("/editSpecialize/:id", auth,upload1.single('img'),specializeController.editSpecialize);
router.delete("/all/:id", auth,specializeController.deleteSpecialize);
router.get('/all',specializeController.all)
module.exports = router;

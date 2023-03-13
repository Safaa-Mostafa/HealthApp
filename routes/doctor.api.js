const router = require("express").Router();
const auth = require("../middleware/auth");
const doctorController = require("../app/controller/doctor.controller");
const upload1 = require("../middleware/upload");

router.post('/all/:id',upload1.single('img'),doctorController.practicesLicence)
router.post('/addLocation',auth,doctorController.addDoctorData)
router.post('/clinicImgs',upload1.array('img',3),doctorController.addImages)
router.post('/addAppointment',auth,doctorController.addAppointment)
module.exports = router;

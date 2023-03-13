const userModel = require("../database/Models/user.model");
const doctorModel = require("../database/Models/doctor.model");
const moment = require("moment");
const cloudinary = require("../../middleware/cloudinary");
// const cloudinaryImageUploadMethod = async (file) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(file, (err, res) => {
//       if (err) return res.status(500).send("upload image error");
//       resolve({
//         res: res.secure_url,
//       });
//     });
//   });
// };
class doctor {
  static getAlldoctorApproved = async (req, res) => {
    try {
      const doctors = await doctorModel.find({ status: "approved" });
      res.status(200).send({
        apiStatus: true,
        data: doctors,
        message: "Doctors fetched successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static single = async (req, res) => {
    try {
      const doctor = await doctorModel.find({
        _id: req.body.id,
        status: "approved",
      });
      res.status(200).send({
        apiStatus: true,
        data: doctor,
        message: "data fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static practicesLicence = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (user.profilePicture.public_id)
        await cloudinary.uploader.destroy(
          user.profilePicture.public_id,
          function (result) {
            console.log(result);
          }
        );
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "userImages",
        width: 300,
        crop: "scale",
      });
      user.practiceLicense = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      await user.save();
      res.status(200).send({
        apiStatus: true,
        data: "practiceLicense uploaded success",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static addDoctorData = async (req, res) => {
    try {
      const doctor = await doctorModel.find({ userId: req.user._id });
      if (doctor.length > 0) {
        const doctor = await doctorModel.findOneAndUpdate(
          { userId: req.user._id },
          req.body
        );
        res.status(200).send({
          success: true,
          message: "Doctor profile updated successfully",
          data: doctor,
        });
      }
      if (doctor.length == 0) {
        const doctorData = await new doctorModel({
          userId: req.user.id,
          about: req.body.about,
          website: req.body.website,
          spokenLang: req.body.language,
          location: {
            coordinates: [parseFloat(req.body.lat), parseFloat(req.body.lon)],
          },
          experience: req.body.experience,
          feesPerCunsaltation: req.body.fees,
          waitingTime: req.body.waitingTime,
        });
        await doctorData.save();
        res.status(200).send({
          apiStatus: true,
          data: doctorData,
          message: "data added successfully",
        });
      }
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static addImages = async (req, res) => {
    try {
      const user = await doctorModel.findOne({ userId: req.body.userId });

      if (user) {
        const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;

          const newPath = await cloudinary.uploader.upload(path, {
            folder: "clinicImages",
            width: 300,
            crop: "scale",
          });
          urls.push({ public_id: newPath.public_id, url: newPath.secure_url });
        }
        urls.forEach((url) => user.img.push(url));

        await user.save();
        res.status(200).send({
          apiStatus: true,
          data: user,
          message: "clinic images uploaded",
        });
      }
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static addAppointment = async (req, res) => {
    try {
      if (req.user.isDoctor) {
        const doctor = await doctorModel.findOne({ userId: req.user._id });
        doctor.timeslots = [
          {
            day: req.body.day,
            slot: [
              {
                start: req.body.start,
                end: req.body.end,
                numberofBookings: req.body.arrivals,
              },
            ],
          },
        ];
        console.log(doctor);
        await doctor.save();
        res.status(200).send({
          apiStatus: true,
          data: doctor,
          message: "appointment added success",
        });
      }
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
}

module.exports = doctor;

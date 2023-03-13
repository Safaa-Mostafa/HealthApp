const specializeModel = require("../database/Models/specialize.model");
class specialize {
  static addSpecialize = async (req, res) => {
    try {
      if (req.user.isAdmin) {
        const existingSpecialize = await specializeModel.findOne({
          name: req.body.name,
        });
        if (existingSpecialize) {
          return res
            .status(200)
            .send({ apiStatus: true, message: "Specialize Already exist" });
        }
        const specialize = new specializeModel({ ...req.body });
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "specializeImgs",
          width: 300,
          crop: "scale",
        });
        specialize.img = {
          public_id: result.public_id,
          url: result.secure_url,
        };

        await specialize.save();
        return res.status(203).send({
          apiStatus: true,
          data: { specialize },
          message: "Specialize added successfully",
        });
      } else {
        return res
          .status(403)
          .send({ apiStatus: false, message: "non authorized" });
      }
    } catch (E) {
      return res.status(500).send({ apiStatus: false, message: E.message });
    }
  };
  static editSpecialize = async (req, res) => {
    try {
      if (req.user.isAdmin) {
        const specialize = await specializeModel.findById(req.params.id);
        specialize.name = req.body.name;
        if (specialize.public_id)
          await cloudinary.uploader.destroy(
            specialize.img.public_id,
            function (result) {
              console.log(result);
            }
          );
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "userImages",
          width: 300,
          crop: "scale",
        });
        specialize.img = {
          public_id: result.public_id,
          url: result.secure_url,
        };

        await specialize.save();
        res.status(200).send({
          apiStatus: true,
          data: specialize,
          message: "edited successfully",
        });
      } else {
        res.status(200).send({
          apiStatus: true,
          message: "you are not an admin",
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
  static deleteSpecialize = async (req, res) => {
    try {
      if (req.user.isAdmin) {
        const specialize = await specializeModel.findByIdAndDelete(
          req.params.id
        );
        if (specialize.public_id)
          await cloudinary.uploader.destroy(specialize.img.public_id);

        res.status(200).send({
          apiStatus: true,
          data: specialize,
          message: "deleted successfully",
        });
      } else {
        res.status(200).send({
          apiStatus: true,
          message: "you are not an admin",
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
  static all = async (req, res) => {
    try {
      const specialize = await specializeModel.find({});
      res.status(200).send({
        apiStatus: true,
        data: specialize,
        message: "all specialize fetched success",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
}
module.exports = specialize;

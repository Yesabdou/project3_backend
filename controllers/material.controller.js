const MaterialModel = require("../Models/material.model");

//route ok
module.exports.newMaterial = async (req, res) => {
  try {
    console.log("i am in the back");
    const {
      name,
      ref,
      category,
      description,
      condition,
      ageMin,
      ageMax,
      picture,
      owner,
    } = req.body;
    let pic;
    if (req.file) {
      pic = req.file.path;
    } else {
      pic = picture;
    }
    const material = await MaterialModel.create({
      name,
      ref,
      category,
      description,
      condition,
      ageMin,
      ageMax,
      picture: pic,
      owner,
    });
    res.status(201).json({ material: material._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
//route ok
module.exports.getAllMaterials = async (req, res) => {
  const materials = await MaterialModel.find().populate("owner");
  res.json(materials);
};
// route ok
module.exports.getOneMaterial = async (req, res) => {
  const material = await MaterialModel.findById(req.params.id).populate(
    "owner"
  );
  res.json(material);
};

//route ok
module.exports.deleteMaterial = async (req, res) => {
  try {
    await MaterialModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Item successfully deleted " });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteManyMaterial = async (req, res) => {
  try {
    await MaterialModel.deleteMany({ owner: req.params.id });
    res.status(200).json({ message: "Item successfully deleted " });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateMaterial = async (req, res) => {
  try {
    const updatedMat = await MaterialModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(updatedMat);
  } catch (error) {
    console.log(error);
  }
};

const catchAsync = require("../utils/catchAsync");
const { upload } = require("../utils/cloudinary");

const imageUpload = catchAsync(async (req, res) => {
  if (!req.files) return res.send("Please upload an image");
  const fileTypes = ["image/jpeg", "image/png", "image/jpg"];

  const { image } = req.files;

  if (!fileTypes.includes(image.mimetype))
    return res.send("Image formats supported: JPG, PNG, JPEG");

  const imageSize = 1024;
  if (image.size / 1024 > imageSize)
    return res.send(`Image size should be less than ${imageSize}kb`);

  const cloudFile = await upload(image.tempFilePath);
  console.log(cloudFile);

  res.status(201).json({
    message: "Image uploaded successfully",
    imageUrl: cloudFile.url,
  });
});

module.exports = imageUpload;

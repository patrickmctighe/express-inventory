const Types = require("../models/type");
const Guns = require("../models/gun");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/types"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    // Define the filename (you can customize this)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Display list of all types.
exports.types_list = asyncHandler(async function (req, res) {
  const allTypes = await Types.find().sort({ type_name: 1 }).exec();

  res.render("types_list", {
    title: "Types List",
    types_list: allTypes,
  });
});

// Display detail page for a specific type.
exports.types_detail = asyncHandler(async function (req, res) {
  const type = await Types.findById(req.params.id).exec();
  if (type == null) {
    const err = new Error("Type not found");
    err.status = 404;
    return next(err);
  }
  const guns = await Guns.find({ gun_type: req.params.id });
  res.render("types_detail", {
    title: `Type: ${type.type_name}`,
    type: type,
    guns: guns,
  });
});

// Display type create form on GET.
exports.types_create_get = asyncHandler(async function (req, res) {
  res.render("types_form", { title: "Create Type" });
});

// Handle type create on POST.
exports.types_create_post = [
  upload.single("type_image"),
  body("type_name", "Type name required").trim().isLength({ min: 1 }).escape(),
  body("type_description", "Type description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("image_source").custom((value, { req }) => {
    // Set imageSource based on the selected option
    imageSource = value;
    if (value === "upload" && !req.file) {
      throw new Error("Image upload required");
    } else if (value === "url" && !req.body.type_image_url) {
      throw new Error("Image URL required");
    }
    return true;
  }),
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("types_form", {
        title: "Create Type",
        type: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      const typeExists = await Types.findOne({
        type_name: req.body.type_name,
      }).exec();
      if (typeExists) {
        res.redirect(typeExists.url);
      } else {
        const type = new Types({
          type_name: req.body.type_name,
          type_description: req.body.type_description,
          type_image:
            imageSource === "upload"
              ? `/types/${req.file.filename}`
              : req.body.type_image_url,
        });
        await type.save();
        res.redirect(type.url);
      }
    }
  }),
];

// Display type delete form on GET.
exports.types_delete_get = asyncHandler(async function (req, res) {
 const type = await Types.findById(req.params.id).exec();
 if (type === null) {
  console.log("Type not found");
  res.redirect("/catalog/types");
 }
 res.render("types_delete", {
  title: `Delete Type: ${type.type_name}`,
  type: type,
 });
});

// Handle type delete on POST.
exports.types_delete_post = asyncHandler(async function (req, res) {
  console.log("Deleting Type:", req.params.id);

  try {
    const type = await Types.findByIdAndDelete(req.params.id);
    console.log("Type deleted:", type);
    res.redirect("/catalog/types");
  } catch (error) {
    console.error("Error deleting type:", error);
    res.status(500).send("Error deleting type");
  }
});

// Display type update form on GET
exports.types_update_get = asyncHandler(async function (req, res) {
  const type = await Types.findById(req.params.id).exec();
  if (type === null) {
    console.log("Type not found");
    res.redirect("/catalog/types");
  }
  res.render("types_form", { title: "Update Type", type: type });
});

// Handle type update on POST
exports.types_update_post = [
  // File upload middleware
  upload.single("type_image"),
  // Validation middleware for various fields
  body("type_name", "Type name required").trim().isLength({ min: 1 }).escape(),
  body("type_description", "Type description required").trim().isLength({ min: 1 }).escape(),
  body("image_source").custom((value, { req }) => {
    // Set imageSource based on the selected option
    imageSource = value;
    if (value === "upload" && !req.file) {
      throw new Error("Image upload required");
    } else if (value === "url" && !req.body.type_image_url) {
      throw new Error("Image URL required");
    }
    return true;
  }),

  asyncHandler(async function (req, res) {
    // Validate the request and check for errors
    const errors = validationResult(req);

    // If there are validation errors, re-render the form with error messages
    if (!errors.isEmpty()) {
      res.render("types_form", {
        title: "Update Type",
        type: req.body,
        errors: errors.array(),
      });
      return;
    }

    try {
      // Find the existing type by ID
      const existingType = await Types.findById(req.params.id).exec();

      // Update the type's fields with the new data
      existingType.type_name = req.body.type_name;
      existingType.type_description = req.body.type_description;
      existingType.type_image =
        imageSource === "upload" ? `/types/${req.file.filename}` : req.body.type_image_url;

      // Save the updated type
      await existingType.save();

      // Redirect to the updated type's URL
      res.redirect(existingType.url);
    } catch (error) {
      console.error("Error updating type:", error);
      res.status(500).send("Internal Server Error");
    }
  }),
];

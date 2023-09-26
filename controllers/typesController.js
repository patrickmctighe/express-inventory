
const Types = require("../models/type");
const Guns = require("../models/gun");
const multer = require('multer');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/types'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    // Define the filename (you can customize this)
    cb(null, Date.now() + '-' + file.originalname);
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
      const typeExists = await Types.findOne({ type_name: req.body.type_name }).exec();
      if(typeExists) {
        res.redirect(typeExists.url);
      } else {const type = new Types({type_name: req.body.type_name, type_description: req.body.type_description, type_image: "/types/"+req.file.filename});
        await type.save();
        res.redirect(type.url);
      }
    }
  }),
]

// Display type delete form on GET.
exports.types_delete_get = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: types delete GET");
});

// Handle type delete on POST.
exports.types_delete_post = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: types delete POST");
});

// Display type update form on GET.
exports.types_update_get = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: types update GET");
});

// Handle type update on POST.
exports.types_update_post = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: types update POST");
});

const Makers = require("../models/maker");
const Guns = require("../models/gun");
const multer = require('multer');
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/makers'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    // Define the filename (you can customize this)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
//display list of all makers
exports.makers_list = asyncHandler(async function (req, res) {
  const allMakers = await Makers.find()
    .sort({ maker_name: 1 })
    .exec();
  res.render("makers_list", {
    title: "Makers List",
    makers_list: allMakers,
  });
});

//display detail page for a specific maker

exports.makers_detail = asyncHandler(async (req, res) => {
 const maker = await Makers.findById(req.params.id).exec();

    if (!maker) {
      // Handle the case where the maker is not found (e.g., render an error page)
      return res.status(404).render('error', { message: 'Maker not found' });
    }
    const guns = await Guns.find({ gun_maker: req.params.id });
    // Render the EJS view and pass the maker's data to it
    res.render('makers_detail', {
      title: `Maker: ${maker.maker_name}`,
      maker: maker,
      guns: guns
    });

});

//display maker create form on GET

exports.makers_create_get = asyncHandler(async function (req, res) {
  res.render("makers_form", { title: "Create Maker" });
});

//handle maker create on POST

exports.makers_create_post = [
  upload.single('maker_image'),
  body("maker_name", "Maker name required").trim().isLength({ min: 1 }).escape(),
  body("maker_description", "Maker description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  

  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      // If there are validation errors, re-render the form with error messages
      res.render("makers_form", {
        title: "Create Maker",
        maker: req.body, // Pass the form data back for user convenience
        errors: errors.array(),
      });
      return;
    } else {
      const makerExists = await Makers.findOne({ maker_name: req.body.maker_name }).exec();
      if (makerExists) {
        res.redirect(makerExists.url);
      } else {
        // Create a new Maker instance with the correct image filename
        const maker = new Makers({
          maker_name: req.body.maker_name,
          maker_description: req.body.maker_description,
          maker_image: "/makers/"+ req.file.filename, // Set the image filename
        });
        await maker.save();
        res.redirect(maker.url);
      }
    }
  }),
];

//display maker delete form on GET

exports.makers_delete_get = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: makers delete GET");
});

//handle maker delete on POST

exports.makers_delete_post = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: makers delete POST");
});

//display maker update form on GET

exports.makers_update_get = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: makers update GET");
});

//handle maker update on POST

exports.makers_update_post = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: makers update POST");
});

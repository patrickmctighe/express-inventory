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
  
    body("image_source").custom((value, { req }) => {
      // Set imageSource based on the selected option
      imageSource = value;
      if (value === "upload" && !req.file) {
        throw new Error("Image upload required");
      } else if (value === "url" && !req.body.maker_image_url) {
        throw new Error("Image URL required");
      }
      return true;
    }),

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
          maker_image: imageSource === "upload"
          ? `/makers/${req.file.filename}`
          : req.body.maker_image_url,
        });
        await maker.save();
        res.redirect(maker.url);
      }
    }
  }),
];

//display maker delete form on GET

exports.makers_delete_get = asyncHandler(async function (req, res) {
const maker = await Makers.findById(req.params.id).exec();
if (maker === null){
  console.log("maker not found");
  res.redirect("/catalog/makers");
}
res.render("makers_delete", { title: "Delete Maker", maker: maker });
});

//handle maker delete on POST

exports.makers_delete_post = asyncHandler(async function (req, res) {
  console.log("Deleting maker:",req.params.id);

try{
  const maker = await Makers.findByIdAndDelete(req.params.id);
  console.log("maker deleted:", maker);
  res.redirect("/catalog/makers");
} catch (error){
  console.error("Error deleting maker:", error);
  res.status(500).send("Error deleting maker");
}
});

// Display maker update form on GET
exports.makers_update_get = asyncHandler(async function (req, res) {
  const maker = await Makers.findById(req.params.id).exec();
  if (maker === null) {
    console.log("Maker not found");
    res.redirect("/catalog/makers");
  }
  res.render("makers_form", { title: "Update Maker", maker: maker });
});

// Handle maker update on POST
exports.makers_update_post = [
  // File upload middleware
  upload.single("maker_image"),
  // Validation middleware for various fields
  body("maker_name", "Maker name required").trim().isLength({ min: 1 }).escape(),
  body("maker_description", "Maker description required").trim().isLength({ min: 1 }).escape(),
  body("image_source").custom((value, { req }) => {
    // Set imageSource based on the selected option
    imageSource = value;
    if (value === "upload" && !req.file) {
      throw new Error("Image upload required");
    } else if (value === "url" && !req.body.maker_image_url) {
      throw new Error("Image URL required");
    }
    return true;
  }),

  asyncHandler(async function (req, res) {
    // Validate the request and check for errors
    const errors = validationResult(req);

    // If there are validation errors, re-render the form with error messages
    if (!errors.isEmpty()) {
      res.render("makers_form", {
        title: "Update Maker",
        maker: req.body,
        errors: errors.array(),
      });
      return;
    }

    try {
      // Find the existing maker by ID
      const existingMaker = await Makers.findById(req.params.id).exec();

      // Update the maker's fields with the new data
      existingMaker.maker_name = req.body.maker_name;
      existingMaker.maker_description = req.body.maker_description;
      existingMaker.maker_image =
        imageSource === "upload" ? `/makers/${req.file.filename}` : req.body.maker_image_url;

      // Save the updated maker
      await existingMaker.save();

      // Redirect to the updated maker's URL
      res.redirect(existingMaker.url);
    } catch (error) {
      console.error("Error updating maker:", error);
      res.status(500).send("Internal Server Error");
    }
  }),
];


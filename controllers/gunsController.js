const Guns = require("../models/gun");
const Makers = require("../models/maker");
const Types = require("../models/type");
const Specs = require("../models/specs");
const async = require("async"); 
const multer = require("multer");
const { body, validationResult } = require("express-validator");


const asyncHandler = require("express-async-handler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/guns'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    // Define the filename (you can customize this)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


exports.index = asyncHandler(async function (req, res) {
    const [
        numGuns,
        numMakers,
        numTypes,
        numSpecs
    ] = await Promise.all([
        Guns.countDocuments({}),
        Makers.countDocuments({}),
        Types.countDocuments({}),
        Specs.countDocuments({})
    ]);
    res.render("index", {
        
        title: "Gun Inventory Home",
        error: false,
        gun_count:numGuns,
        maker_count:numMakers,
           types_count:numTypes,
            specs_count: numSpecs,
      
    });
  });
  
//display list of all guns
const Gun = require('../models/gun');

exports.guns_list = asyncHandler(async function (req, res) {
    const allGuns = await Gun.find()
        .populate('gun_maker') 
        .populate('gun_type')// Populate the gun_maker field to get the maker details
        .sort({ gun_name: 1 })
        .exec();

    res.render("guns_list", {
        title: "Guns List",
        guns_list: allGuns,
    });
});
//display detail page for a specific gun
exports.guns_detail = asyncHandler(async function (req, res) {
  const gun = await Gun.findById(req.params.id)
    .populate('gun_maker')
    .populate('gun_type')
    .populate('gun_specs')
    .exec();
    
  if (gun == null) {
    const err = new Error("Gun not found");
    err.status = 404;
    return next(err);
  }
  
  // Assuming gun_image is stored as a Buffer in gun.gun_image
  const gunImage = gun.gun_image;

  res.render("guns_detail", {
    title: "Gun Details",
    gun: gun,
    gunImage: gunImage, // Pass the gun image data to the template
  });
});

//display gun create form on GET

// Display gun create form on GET
exports.guns_create_get = asyncHandler(async function (req, res) {
  // Fetch all makers and types
  const [allMakers, allTypes] = await Promise.all([
    Makers.find().exec(),
    Types.find().exec(),
  ]);

  // Initialize an empty gun object to pass to the view
  const emptyGun = {
    gun_name: "",
    gun_type: "",
    gun_description: "",
    gun_price: "",
    gun_image: "",  // You might want to set a default image URL or leave it empty
    gun_stock: "",
    gun_sold: "",
    gun_specs: {
      specs_atk_power: "",
      specs_impact: "",
      specs_rounds: "",
      specs_weight: "",
      specs_en: "",
    },
    gun_maker: "",
  };

  res.render("guns_form", {
    title: "Create Gun",
    makers_list: allMakers,
    types_list: allTypes,
    gun: emptyGun,
  });
});


//handle gun create on POST

exports.guns_create_post = [
  upload.single("gun_image"),
  body("gun_name", "Gun name required").trim().isLength({ min: 1 }).escape(),
  body("gun_type", "Gun type required").trim().isLength({ min: 1 }).escape(),
  body("gun_description", "Gun description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("gun_price", "Gun price required").trim().isLength({ min: 1 }).escape(),
  body("specs_atk_power", "Attack Power is required").trim().isLength({ min: 1 }).escape(),
  body("specs_impact", "Impact is required").trim().isLength({ min: 1 }).escape(),
  body("specs_rounds", "Rounds is required").trim().isLength({ min: 1 }).escape(),
  body("specs_weight", "Weight is required").trim().isLength({ min: 1 }).escape(),
  body("specs_en", "Energy Consumption is required").trim().isLength({ min: 1 }).escape(),
  
  body("gun_maker", "Gun maker required").trim().isLength({ min: 1 }).escape(),
  body("gun_stock", "Gun stock required").trim().isLength({ min: 1 }).escape(),
  body("gun_sold", "Gun sold required").trim().isLength({ min: 1 }).escape(),
  
  asyncHandler(async function (req, res, next) {
      const errors = validationResult(req);

      const gunSpecs = new Specs({
        specs_atk_power: req.body.specs_atk_power,
        specs_impact: req.body.specs_impact,
        specs_rounds: req.body.specs_rounds,
        specs_weight: req.body.specs_weight,
        specs_en: req.body.specs_en,
      });

      const gun = new Gun({
        gun_name: req.body.gun_name,
        gun_type: req.body.gun_type, // Use the selected type document
        gun_description: req.body.gun_description,
        gun_price: req.body.gun_price,
        gun_specs: gunSpecs,
        gun_maker: req.body.gun_maker, // Use the selected maker document
        gun_image: "/guns/" + req.file.filename,
        gun_stock: req.body.gun_stock,
        gun_sold: req.body.gun_sold,
      });



 
  
    if (!errors.isEmpty()) {

    const [allMakers, allTypes] = await Promise.all([
      Makers.find().exec(),
      Types.find().exec(),
    ]);

      res.render("guns_form", {
        title: "Create Gun",
        gun: req.body,
        makers_list: allMakers,
        types_list: allTypes,
        errors: errors.array(),
      });
    } else {
      const gunExists = await Gun.findOne({ gun_name: req.body.gun_name }).exec();
      if (gunExists) {
        res.redirect(gunExists.url);
      } else {
       
          await Promise.all([gunSpecs.save(),gun.save()]);
        res.redirect(gun.url);
        }
  
     
      
      }
    }
  ),
];
  

//display gun delete form on GET

exports.guns_delete_get = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: guns delete GET");
});

//handle gun delete on POST

exports.guns_delete_post = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: guns delete POST");
});

//display gun update form on GET

exports.guns_update_get = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: guns update GET");
});

//handle gun update on POST

exports.guns_update_post = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: guns update POST");
});

const Guns = require("../models/gun");
const Makers = require("../models/maker");
const Types = require("../models/type");
const Specs = require("../models/specs");

const asyncHandler = require("express-async-handler");


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
  res.render("guns_detail", {
    title: "Gun Details",
    gun: gun,
  });
});

//display gun create form on GET

exports.guns_create_get = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: guns create GET");
});

//handle gun create on POST

exports.guns_create_post = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: guns create POST");
});

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

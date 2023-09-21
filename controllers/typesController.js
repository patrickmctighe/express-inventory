const Types = require("../models/type");
const Guns = require("../models/gun");
const asyncHandler = require("express-async-handler");

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
  res.send("NOT IMPLEMENTED: types create GET");
});

// Handle type create on POST.
exports.types_create_post = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: types create POST");
});

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

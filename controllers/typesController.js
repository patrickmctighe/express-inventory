const Types = require("../models/type");

const asyncHandler = require("express-async-handler");

// Display list of all types.
exports.types_list = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: types list");
});

// Display detail page for a specific type.
exports.types_detail = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: types detail: " + req.params.id);
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

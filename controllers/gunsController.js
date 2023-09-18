const Guns = require("../models/guns");
const asyncHandler = require("express-async-handler");

//display list of all guns
exports.guns_list = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: guns list");
});

//display detail page for a specific gun

exports.guns_detail = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: guns detail: " + req.params.id);
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

const Makers = require("../models/maker");
const asyncHandler = require("express-async-handler");

//display list of all makers
exports.makers_list = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: makers list");
});

//display detail page for a specific maker

exports.makers_detail = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: makers detail: " + req.params.id);
});

//display maker create form on GET

exports.makers_create_get = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: makers create GET");
});

//handle maker create on POST

exports.makers_create_post = asyncHandler(async function (req, res) {
  res.send("NOT IMPLEMENTED: makers create POST");
});

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

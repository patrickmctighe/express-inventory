const Specs = require('../models/specs');
const asyncHandler = require('express-async-handler');

// Display list of all Specs.
exports.specs_list = asyncHandler(async function (req, res) {
  res.send('NOT IMPLEMENTED: Specs list');
});

// Display detail page for a specific Specs.
exports.specs_detail = asyncHandler(async function (req, res) {
  res.send('NOT IMPLEMENTED: Specs detail: ' + req.params.id);
});

// Display Specs create form on GET.
exports.specs_create_get = asyncHandler(async function (req, res) {
  res.send('NOT IMPLEMENTED: Specs create GET');
});

// Handle Specs create on POST.
exports.specs_create_post = asyncHandler(async function (req, res) {
  res.send('NOT IMPLEMENTED: Specs create POST');
});

// Display Specs delete form on GET.
exports.specs_delete_get = asyncHandler(async function (req, res) {
  res.send('NOT IMPLEMENTED: Specs delete GET');
});

// Handle Specs delete on POST.
exports.specs_delete_post = asyncHandler(async function (req, res) {
  res.send('NOT IMPLEMENTED: Specs delete POST');
});

// Display Specs update form on GET.
exports.specs_update_get = asyncHandler(async function (req, res) {
  res.send('NOT IMPLEMENTED: Specs update GET');
});

// Handle Specs update on POST.
exports.specs_update_post = asyncHandler(async function (req, res) {
  res.send('NOT IMPLEMENTED: Specs update POST');
});


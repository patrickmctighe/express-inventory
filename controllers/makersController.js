const Makers = require("../models/maker");
const Guns = require("../models/gun");
const asyncHandler = require("express-async-handler");

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

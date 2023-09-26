const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MakerSchema = new Schema({
    maker_name: { type: String, required: true },
    maker_description: { type: String, required: true },
    maker_image: { type: String, required: true }, 
});

MakerSchema.virtual("url").get(function () {
    return "/catalog/maker/" + this._id;
});

module.exports = mongoose.model("Maker", MakerSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SpecsSchema = new Schema({
    specs_atk_power: { type: Number, required: true },
    specs_impact: { type: Number, required: true },
    specs_rounds: { type: Number, required: true },
    specs_weight: { type: Number, required: true },
    specs_en: { type: Number, required: true },
});

SpecsSchema.virtual("url").get(function () {
    return "/catalog/specs/" + this._id;
});


module.exports = mongoose.model("Specs", SpecsSchema);


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GunSchema = new Schema({
    gun_name: { type: String, required: true },
    gun_type: {type: Schema.Types.ObjectId, ref: "Type", required: true},
    gun_description: { type: String, required: true },
    gun_price: { type: Number, required: true },
    gun_specs: { type: Schema.Types.ObjectId, ref: "Specs", required: true },
    gun_maker: { type: Schema.Types.ObjectId, ref: "Maker", required: true },
    gun_image: { type: String, required: true },
    gun_stock: { type: Number, required: true },
    gun_sold: { type: Number, required: true },
});

GunSchema.virtual("url").get(function () {
    return "/catalog/gun/" + this._id;
});

module.exports = mongoose.model("Gun", GunSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    type_name: { type: String, required: true },
    type_description: { type: String, required: true },
type_image: {type: String, required: true},
});

TypeSchema.virtual("url").get(function () {
    return "/catalog/type/" + this._id;
}
);

module.exports = mongoose.model("Type", TypeSchema);
const mongoose = require(".");
const mongoosePaginate = require("mongoose-paginate-v2");

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    serial: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

phoneSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Phone", phoneSchema);
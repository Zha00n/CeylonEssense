//This refers to news update

const mongoose = require('mongoose');

const productResourceSchema = new mongoose.Schema({
    resourceId: { type: Number, required: true },
    title: {type: String},
    image: { type: String, required: true },
    description: {type: String},
    video: {type: String},
});

module.exports = mongoose.model('resource', productResourceSchema);

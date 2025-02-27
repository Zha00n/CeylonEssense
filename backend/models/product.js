const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    title: { type: String, },
    image: [{ type: String }],
    category: { type: String, },
    description: { type: String, },
    sellerName: {type: String, },
    sellerCall: {type: String, },
    sellerWa: {type: String, },
    certiImages: [{ type: String }],
});

module.exports = mongoose.model('product', productSchema);

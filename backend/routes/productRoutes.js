const express = require('express');
const multer = require('multer');
const Product = require('../models/product');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// Multer storage for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Add a new product
router.post('/add-product', verifyToken, upload.fields([
    { name: 'image', maxCount: 3 },
    { name: 'certiImages', maxCount: 5 },

]), async (req, res) => {
    try {

        const getLastItem = await Product.findOne({}).sort({ productId: -1 }).limit(1);
        const id = getLastItem ? getLastItem.productId + 1 : 1;



        const newProduct = new Product({
            productId: id,
            title: req.body.title,
            image: req.files['image'].map(file => file.path),
            description: req.body.description,
            category: req.body.category,
            sellerName: req.body.sellerName,
            sellerCall: req.body.sellerCall,
            sellerWa: req.body.sellerWa,
            certiImages: req.files['certiImages'].map(file => file.path),
        });

        await newProduct.save();
        return res.status(200).json({ message: "product added successfully!" });
    
    } catch (error) {
        res.status(400).send({ error: "Failed to add product!" });
    }
});



// Update an existing product
router.put('/update-product/:productId', verifyToken, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'certiImages', maxCount: 5 },
]), async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId });
        if (!product) {
            return res.status(404).send({ error: "product not found!" });
        }

        // Update product
        product.image = req.files['image'] ? req.files['image'][0].path : product.image;
        product.certiImages = req.files['certiImages'] ? req.files['certiImages'].map(file => file.path) : product.certiImages;
        product.title = req.body.title || product.title;
        product.description = req.body.description || product.description;
        product.category = req.body.category || product.category;
        product.sellerName = req.body.sellerName || product.sellerName;
        product.sellerCall = req.body.sellerCall || product.sellerCall;
        product.sellerWa = req.body.sellerWa || product.sellerWa;
        product.certiImages = req.body.certiImages || product.certiImages;

        await product.save();
        res.status(200).send({ message: "product updated successfully!", product });
    
    } catch (error) {
        res.status(400).send({ error: "Failed to update product!" });
    }
});



// Get product by ID
router.get('/get/:productId', async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId });
        if (!product) {
            return res.status(404).send({ error: "product not found!" });
        }
        res.send(product);
    } catch (error) {
        res.status(400).send({ error: "Failed to retrieve product data!" });
    }
});

// Get all products
router.get('/getAll', async (req, res) => {
    try {
        const products = await Product.find({});
        if (products.length === 0) {
            return res.status(404).send({ error: "No products found!" });
        }
        res.send(products);
    } catch (error) {
        res.status(400).send({ error: "Failed to retrieve product data!" });
    }
});


// Delete product by ID
router.delete('/delete/:productId',verifyToken, async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ productId: req.params.productId });
        if (!deletedProduct) {
            return res.status(404).send({ error: "product not found!" });
        }
        res.send({ message: "product deleted successfully!", deletedProduct });
    } catch (error) {
        res.status(400).send({ error: "Failed to delete product!" });
    }
});



module.exports = router;

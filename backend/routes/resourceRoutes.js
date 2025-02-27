//This refers to news update routes

const express = require('express');
const multer = require('multer');
const Resource = require('../models/productResource');
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

// Add a new resource
router.post('/add-resource', verifyToken, upload.fields([
    { name: 'image', maxCount: 1 },
]), async (req, res) => {
    try {

        const getLastItem = await Resource.findOne({}).sort({ resourceId: -1 }).limit(1);
        const id = getLastItem ? getLastItem.resourceId + 1 : 1;



        const newResource = new Resource({
            resourceId: id,
            title: req.body.title,
            image: req.files['image'][0].path,
            description: req.body.description,
            video: req.body.video,

        });

        await newResource.save();
        return res.status(200).json({ message: "resource added successfully!" });
    
    } catch (error) {
        res.status(400).send({ error: "Failed to add resource!" });
    }
});


// Update an existing resource
router.put('/update-resource/:resourceId', verifyToken, upload.fields([
    { name: 'image', maxCount: 1 },
]), async (req, res) => {
    try {
        const resource = await Resource.findOne({ resourceId: req.params.resourceId });
        if (!resource) {
            return res.status(404).send({ error: "resource not found!" });
        }

        // Update resource
        resource.image = req.files['image'] ? req.files['image'][0].path : resource.image;
        resource.title = req.body.title || resource.title;
        resource.description = req.body.description || resource.description;
        resource.video = req.body.video || resource.video;

        await resource.save();
        res.status(200).send({ message: "resource updated successfully!", resource });
    
    } catch (error) {
        res.status(400).send({ error: "Failed to update resource!" });
    }
});


// Get resource by ID
router.get('/get/:resourceId', async (req, res) => {
    try {
        const resource = await Resource.findOne({ resourceId: req.params.resourceId });
        if (!resource) {
            return res.status(404).send({ error: "resource not found!" });
        }
        res.send(resource);
    } catch (error) {
        res.status(400).send({ error: "Failed to retrieve resource data!" });
    }
});

// Get all resources
router.get('/getAll', async (req, res) => {
    try {
        const resources = await Resource.find({});
        if (resources.length === 0) {
            return res.status(404).send({ error: "No resources found!" });
        }
        res.send(resources);
    } catch (error) {
        res.status(400).send({ error: "Failed to retrieve resource data!" });
    }
});


// Delete resource by ID
router.delete('/delete/:resourceId',verifyToken, async (req, res) => {
    try {
        const deletedResource = await Resource.findOneAndDelete({ resourceId: req.params.resourceId });
        if (!deletedResource) {
            return res.status(404).send({ error: "resource not found!" });
        }
        res.send({ message: "resource deleted successfully!", deletedResource });
    } catch (error) {
        res.status(400).send({ error: "Failed to delete resource!" });
    }
});



module.exports = router;

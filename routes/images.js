var express = require('express');
var router = express.Router();
var { getImagesById, deleteImage } = require('../db/images')

router.get('/:apartmentId', function(req, res, next) {
    getImagesById(req.params.apartmentId)
        .then(images => res.status(200).json(images))
        .catch(error => res.status(500).json({ error: error.message }));
});
router.delete('/:imageId', function(req, res, next) {
    deleteImage(req.params.imageId)
        .then(images => res.status(200).json(images))
        .catch(error => res.status(500).json({ error: error.message }));
});


module.exports = router;
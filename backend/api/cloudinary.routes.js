const express = require('express')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2;


const upload = multer({ dest: 'uploads/' })

const cloudinaryConfig = require('../config/cloudinary.json').cloudinary
cloudinary.config(cloudinaryConfig)

// app.use(express.static('public'))

module.exports =  router

router.post('/', upload.single('imgUpload'), (req, res) => {
    console.log(req.file)
    cloudinary.uploader.upload(req.file.path, 
        function (error, result) {
            res.json(result)
        });
})
const express = require('express')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const directory = 'uploads';


const upload = multer({ dest: 'uploads/' })

const cloudinaryConfig = require('../config/cloudinary.json').cloudinary
cloudinary.config(cloudinaryConfig)

module.exports =  router

router.post('/', upload.single('imgUpload'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, 
        function (error, result) {
            res.json(result)
            clearUploads();
        });
})

function clearUploads(){
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
}
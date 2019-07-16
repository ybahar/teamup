const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const eventeraController = require('./eventera.controller')
const router = express.Router()
module.exports =  router
router.get('/',eventeraController.getEventeras);
router.get('/:id',eventeraController.getEventeraById);
router.delete('/:id',eventeraController.removeEventera);
router.post('/',eventeraController.addEventera);
router.put('/:id',eventeraController.updateEventera);
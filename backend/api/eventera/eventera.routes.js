const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const eventeraController = require('./eventera.controller')
const router = express.Router()
module.exports =  router
router.get('/',eventeraController.getEventeras);
router.get('/:id',eventeraController.getEventeraById);
router.delete('/:id',requireAuth,eventeraController.removeEventera);
router.post('/',requireAuth,eventeraController.addEventera);
router.put('/join/:id',requireAuth,eventeraController.joinEventera);
router.put('/leave/:id',requireAuth,eventeraController.leaveEventera);
router.put('/:id',requireAuth,eventeraController.updateEventera);
const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const userController = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', userController.getUsers)
router.get('/current', userController.getLoggedInUser)
router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', requireAuth, userController.deleteUser)


module.exports = router


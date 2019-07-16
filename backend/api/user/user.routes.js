const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser,getLoggedInUser} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)
router.get('/current', getLoggedInUser)
router.get('/:id', getUser)
router.delete('/:id',  requireAuth, deleteUser)

module.exports = router


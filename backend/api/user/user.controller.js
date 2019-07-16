const userService = require('./user.service')

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.json(user)
}
  
 async function getUsers(req, res) {
    let filterBy = req.body
    const users = await userService.query(filterBy)
    res.json(users)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.json({})
}

async function getLoggedInUser(req , res) {
    let user = req.session.user;
    if(user) res.json(user);
    else res.status(401).send('Unautharized')
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    getLoggedInUser

}

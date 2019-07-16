const eventeraService = require('./eventera.service');
const logger = require('../../services/logger.service')

module.exports = {
    getEventeras,
    getEventeraById,
    removeEventera,
    addEventera,
    updateEventera,
}

async function getEventeras(req, res) {
    let filterBy = req.query;
    try {
        let eventeras = await eventeraService.query(filterBy);
        res.json(eventeras);
    } catch (err) {
        logger.error('[Eventera query]', err)
        res.status('500').send({ error: 'could not get eventera list' })
    }
    
}
async function getEventeraById(req, res) {
    let id = req.params.id;
    try {
        let eventera = await eventeraService.getById(id);
        res.json(eventera)
    } catch (err){
        logger.error('[Eventera getById ]',err)
        res.status('500').send({ error: 'Eventera not found' })        
    }
} 

async function removeEventera(req,res){
    let id = req.params.id;
    let user = req.session.user;
    try {
        await eventeraService.remove(id,user);
        res.json({});
    } catch (err){
        logger.error('[Eventera Remove]',err);
        res.status('403').send({error : 'forbidden'})
    }
}

async function addEventera(req,res){
    let eventera = req.body;
    let user = req.session.user;    
    try{
        let eventeraWithId = await eventeraService.add(eventera,user)
        res.json(eventeraWithId)
    } catch(err){
        logger.error('[Eventera Add]',err);
        res.status('403').send({error : 'forbidden'})
    }
}

async function updateEventera(req,res){
    let eventera = req.body
    let user = req.session.user;
    try{
        let updatedEventera =  await eventeraService.update(eventera,user);
        res.json(updatedEventera);
    } catch(err){
        logger.error(`[Eventera Update]${err}`);
        res.status('403').send({error : 'forbidden'})
    }
}
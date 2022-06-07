const  {infoApi} = require('./infoApi.js');
const {Country} = require('../db.js');

const fillDB = async ()=>{
    try{ 
        let checkDb = await Country.findAll()
            if(!checkDb.length){
            const countries = await infoApi()
            await Country.bulkCreate(countries)             
            }
    } catch (error){
        console.log(error) 
    }
}

module.exports = {fillDB};
const db = require('../../db');

module.exports = (req,res) => {
    try{
        const {record_pid} = req.params;


        res.send('I will be deleting something');
    }catch(err){

    }    
}
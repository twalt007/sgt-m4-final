const db = require('../../db');

module.exports = async (req,res) => {
    try{
        const {record_pid} = req.params;

        let output = {
            code: 404,
            errors: [],
            message: 'Bad DELETE Request',
        }

        const [[record=null]] = await db.execute(`SELECT * FROM grades WHERE pid = ?`, [record_pid]);
        if(!record){
            output.errors.push(`No record found with an ID of: ${record_pid}`);
            res.status(404).send({
                ...output
            });
            return;
        }

        await db.execute(`DELETE FROM grades WHERE pid=?`,[record_pid]);
        output.code = 200;
        delete output.errors;
        output.message = `Successfully deleted grade record: ${record_pid}`;
        
        res.status(output.code).send({
            message: output.message,
            deletedPid: record_pid
        });
    }catch(err){

    }    
}
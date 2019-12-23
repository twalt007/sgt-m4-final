const db = require('../../db');

module.exports = async(req,res)=>{
    try{
        const {record_pid} = req.params;
        const {course, grade, name} = req.body;

        let output = {
            code: 200,
            errors: [],
            message: "Bad PATCH Request"
        }

        const [[ record ]] = await db.execute(`Select name FROM grades WHERE pid=?`,[record_pid]);
        if(!record){
            output.code = 404;
            output.errors.push(`No record found with an ID of: ${record_pid}`);
        }
        if(!course && !grade && !name){
            output.code = 400;
            output.errors.push(`No valid fields recieved to update`)
        }
        if(grade && isNaN(grade)||grade>100||grade<0){
            output.code = 422;
            output.errors.push(`Course grade must be a number between 0 and 100. ${grade} is invalid.`);
        }

        if(output.errors.length){
            res.status(output.code).send(output);
            return;
        }


        if(record && course){
            await db.execute(`
                UPDATE grades
                SET course=? 
                WHERE pid=?`,
                [course, record_pid]);            
        }
        if(record && grade){
            await db.execute(`
                UPDATE grades
                SET grade=? 
                WHERE pid=?`,
                [grade, record_pid]);            
        }
        if(record && name){
            await db.execute(`
                UPDATE grades
                SET name=? 
                WHERE pid=?`,
                [name, record_pid]);            
        }  
        
        const [[entry]] = await db.execute(`
                SELECT pid, course, grade, name, updated AS lastUpdated FROM grades WHERE pid=?`,
                [record_pid]);

        output.message = `Student record for ${record_pid} successfully updated.`
        output.record = entry
        const {code, errors, ...o} = output;

        res.status(output.code).send({
            ...o
        });

    }catch(err){
        next(err);
    }

}
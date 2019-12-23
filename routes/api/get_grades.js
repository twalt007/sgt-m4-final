const db = require('../../db');

module.exports = async (req, res) => {
    try {
        const [results] = await db.query(`
        SELECT pid, course, grade, name, updated AS lastUpdated
        FROM grades
    `);

        res.send({
            records: results
        })
    }catch(err){
        next(error);
    }
    
};
const db = require('../../db');

module.exports = async(req,res) => {
    const [[results]] = await db.query(`
        SELECT * FROM grades
    `);

    res.send({
        results
    })
};
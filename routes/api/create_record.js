const db = require('../../db');

module.exports = async (req, res) => {

    const { course, grade, name } = req.body;

    let output = {
        code: 422,
        errors: [],
        message: "Bad POST Request"
    };

    if (!course) {
        output.errors.push('No course name received');
    } if (!name) {
        output.errors.push('No student name received');
    } if (!grade) {
        output.errors.push('No course grade received');
    }
    if (grade && isNaN(grade) || grade > 100 || grade < 1) {
        output.errors.push(`Course grade must be a number between 0 and 100 inclusive. ${grade} is invalid.`);
    }
    if (output.errors) {
        res.status(output.code).send(output);
        return;
    };

    await db.execute(`
            INSERT INTO grades 
            (pid, course, grade, name)
            VALUES (UUID(), ?, ?, ?)`,
        [course, grade, name]);

    const [[entry]] = await db.execute(`
            SELECT pid, course, grade, name, updated AS lastUpdated FROM grades WHERE id=LAST_INSERT_ID(); 
        `)
        
    delete output.code;
    delete output.errors;
    output.message = "New student grade record created successfully";

    res.send({
        message: output.message,
        record: entry
    })
};
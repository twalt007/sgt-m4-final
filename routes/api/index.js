const router = require('express').Router();
const getGrades = require('./get_grades');
const createRecord = require('./create_record');
const updateRecord = require('./update_record');
const deleteRecord = require('./delete_record');

// ROUTES for /api
router.get('/grades', getGrades);
router.post('/grades', createRecord);
router.patch('/grades/:record_pid',updateRecord);
router.delete('/grades/:record_pid',deleteRecord);

module.exports = router;

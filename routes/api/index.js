const router = require('express').Router();
const testApi = require('./test');
const getGrades = require('./get_grades');
const createRecord = require('./create_record');

// ROUTES for /api/test
router.get('/test', testApi);
router.get('/grades', getGrades);
router.post('/grades', createRecord);

module.exports = router;

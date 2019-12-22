const router = require('express').Router();
const testApi = require('./test');
const getGrades = require('./grades');

// ROUTES for /api/test
router.get('/test', testApi);
router.get('/grades',getGrades);

module.exports = router;

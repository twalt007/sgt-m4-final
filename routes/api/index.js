const router = require('express').Router();
const testApi = require('./test');

// ROUTES for /api/test
router.get('/test', testApi);

module.exports = router;

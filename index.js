const express = require('express');
const PORT = process.env.PORT || 9000;
const ApiError = require('./helpers/api_error');
global.ApiError = ApiError;
const routes = require('./routes');
const defaultErrorHandler = require('./middleware/default_error_handler')

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(routes);

app.use(defaultErrorHandler);

app.listen(PORT, ()=>{
    console.log('Server listening at localhost: ' + PORT);
})
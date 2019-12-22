const express = require('express');
const PORT = process.env.PORT || 9000;
const db = require('./db');

const routes = require('./routes');


const app = express();

app.use(routes);



app.listen(PORT, ()=>{
    console.log('Server listening at localhost: ' + PORT);
})
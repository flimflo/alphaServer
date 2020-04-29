//import { v4 as uuidv4, v4 } from 'uuid';
const express = require('express');
const bodyParser = require( 'body-parser' );
const morgan = require('morgan');


const app = express();
const jsonParser = bodyParser.json();


app.use(morgan('dev'));



app.listen(8080, ()=>{
    console.log("This server is running on port 8080.")
});
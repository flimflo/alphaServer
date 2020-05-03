//import { v4 as uuidv4, v4 } from 'uuid';
const express = require('express');
const bodyParser = require( 'body-parser' );
const morgan = require('morgan');
const mongoose = require('mongoose')
const validateToken = require("./middleware/validateToken");
const {Messages} = require('./models/mensajeModel');

const app = express();
const jsonParser = bodyParser.json();


app.use(morgan('dev'));

//GET COMMENTS USER
app.get('/comments/:section', (req, res)=>{

    let section = req.params.section;

    if(!section){
        res.statusMesagge = "Section is missing inside paramaeters request";
        return res.status(406).end(); //not acceptable
    }

    Messages
        .getCommentsUsers({section})
        .then(result => {

            var arrfilter = result.filter(function(arr){
                return arr.approved == true && arr.section == section;
            });

            return res.status(200).json(arrfilter);
        })
        .catch(err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
        });
});

//POST COMMENTS USER
app.post('/comments/:section', jsonParser, (req, res)=>{
    
    let section = req.params.section;
    let content = req.body.content;

    if(!section || !content){
        res.statusMesagge = "One of this parameters is missing in the request: 'section', 'content'";
        return res.status(406).end(); //not acceptable
    }

    let newMessage = {
        content: String(content), 
        section: String(section)
    }

    Messages
        .postMessageUsers(newMessage)
        .then(result =>{
            return res.status(201).json(newMessage);
        })
        .catch( err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
          });
});

//GET COMMENTS ADMIN
app.get('/commentsAdmin/:section', validateToken, (req, res)=>{

    let section = req.params.section;

    if(!section){
        res.statusMesagge = "Section is missing inside paramaeters request";
        return res.status(406).end(); //not acceptable
    }

    Messages
        .getCommentsUsers({section})
        .then(result => {

            var arrfilter = result.filter(function(arr){
                return arr.approved == false && arr.section == section;
            });

            return res.status(200).json(arrfilter);
        })
        .catch(err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
        });
});

//UPDATE COMMENTS ADMIN
app.patch('/commentsAdmin/:id', validateToken, jsonParser, (req, res)=>{

    let id_params = req.params.id;

    if(!id_params){
        res.statusMesagge = "The 'id' as parameter is required.";
        return res.status(406).end();
    }

    let updatedMessage = {
        approved: true 
    }

    Messages
        .updateMessages({_id : id_params},updatedMessage)
        .then(result =>{
            return res.status(202).json(result);
        })
        .catch(err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
        });
});

//DELETE COMMENTS ADMIN
app.delete('/commentsAdmin/:id', validateToken, (req, res )=>{

    let id = req.params.id;

    if(!id){
        res.statusMesagge = "The 'id' as parameter is required.";
        return res.status(406).end();
    }

    Messages
        .deleteMessage({_id : id})
        .then(result =>{
            if(result.deletedCount === 0){
                res.statusMesagge = `The id ${id} was not found in Database`;
                return res.status(404).end(); //Not found
            }
            return res.status(200).json(result);
        })
        .catch(err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
        });
});

app.listen(8080, ()=>{
    console.log("This server is running on port 8080.")

    const settings = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };

    new Promise((resolve, reject) =>{
        mongoose.connect('mongodb://localhost/messagesdb',settings,(err)=>{
            if(err){
                return reject(err);
            }
            else{
                console.log('Database connected successfully.')
                return resolve();
            }
        })
    })
    .catch(err =>{
        console.log(err);
      })
});



//GET COMMENTS USERS endpoint: http://localhost:8080/comments/:section
//POST COMMENTS USERS endpoint: http://localhost:8080/comments/:section
//GET COMMENTS ADMIN endpoint: http://localhost:8080/commentsAdmin/:section
//UPDATE COMMENTS ADMIN endpoint: http://localhost:8080/commentsAdmin/:id
//DELETE COMMENTS ADMIN endpoint: http://localhost:8080/commentsAdmin/:id
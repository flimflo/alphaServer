const router = require("express").Router();
const bodyParser = require( 'body-parser' );
const {Messages} = require('../models/mensajeModel');
const validateToken = require("../middleware/validateToken");

const jsonParser = bodyParser.json();
 
//GET COMMENTS USER
function getcommentsUsers(req, res) {

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

            arrfilter.sort((a, b) => {
                let da = new Date(a.creation_date),
                    db = new Date(b.creation_date);
                return da - db;
            });

            return res.status(200).json(arrfilter);
        })
        .catch(err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
        });
}

//POST COMMENTS USER
function postcommentsUsers(req, res) {

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
}

//GET COMMENTS ADMIN
function getcommentsAdmin(req, res){

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

            arrfilter.sort((a, b) => {
                let da = new Date(a.creation_date),
                    db = new Date(b.creation_date);
                return da - db;
            });

            return res.status(200).json(arrfilter);
        })
        .catch(err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
        });
}

//UPDATE COMMENTS ADMIN
function updatecommentsAdmin(req, res){

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
}

//DELETE COMMENTS ADMIN
function deletecommentsAdmin(req, res){

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

}
 
router.get("/:section", getcommentsUsers);
router.post("/:section", jsonParser ,postcommentsUsers);
router.get('/Admin/:section', validateToken, getcommentsAdmin);
router.patch('/Admin/:id', validateToken, jsonParser, updatecommentsAdmin);
router.delete('/Admin/:id', validateToken,deletecommentsAdmin);
 
module.exports = router;

//GET COMMENTS USERS endpoint: http://localhost:8080/comments/:section
//POST COMMENTS USERS endpoint: http://localhost:8080/comments/:section
//GET COMMENTS ADMIN endpoint: http://localhost:8080/comments/Admin/:section
//UPDATE COMMENTS ADMIN endpoint: http://localhost:8080/comments/Admin/:id
//DELETE COMMENTS ADMIN endpoint: http://localhost:8080/comments/Admin/:id
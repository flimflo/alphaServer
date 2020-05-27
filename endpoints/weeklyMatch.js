const router = require("express").Router();
const bodyParser = require( 'body-parser' );
const {weeklyMatch} = require('../models/weeklyMatchModel');
const validateToken = require("../middleware/validateToken");

const jsonParser = bodyParser.json();

//GET WEEKLY MATCHES
function getWeeklyMatches(req, res){

    weeklyMatch
      .getWeeklyMatch()
      .then(roles => {

          return res.status(200).json({roles});
      })
      .catch(err =>{
          res.statusMessage = "Something is wrong with the Database. Try again later.";
          return res.statusCode(500).end();
      });
}

//POST WEEKLY MATCHES ADMIN
function postWeeklyMatch(req, res) {

    weeklyMatch
        .deleteWeeklyMatch()
        .then(results => {

            let matchArr = req.body.roles;
            let date = req.body.date;

            for(var i = 0; i < matchArr.length; i++){
                
                if(matchArr[i].equipoA == undefined || matchArr[i].equipoB == undefined  || matchArr[i].cancha == undefined || matchArr[i].hora == undefined ){
                    res.statusMesagge = "One of this parameters is missing in the request: 'equipoA', 'equipoB', 'cancha', 'hora'";
                    return res.status(406).end(); //not acceptable
                }
            }

            if(!date){
            res.statusMesagge = "date parameter is missing in the request";
            return res.status(406).end(); //not acceptable
            }

            let newWeeklyMatch = {
            roles: matchArr,
            date: String(date)
            }

            weeklyMatch
            .postWeeklyMatch(newWeeklyMatch)
            .then(result =>{
                return res.status(201).json(newWeeklyMatch);
            })
            .catch( err =>{
                res.statusMessage = "Something is wrong with the Database. Try again later.";
                return res.statusCode(500).end();
                });

            return res.statusCode(200).json(results);
        })
        .catch(err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
        });
}

router.get("/", getWeeklyMatches);
router.post("/", validateToken, jsonParser, postWeeklyMatch);

module.exports = router;

//GET WEEKLY MATCHES endpoint: http://localhost:8080/api/weeklymatch
//POST WEEKLY MATCHES endpoint: http://localhost:8080/api/weeklymatch
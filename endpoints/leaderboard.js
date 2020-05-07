const router = require("express").Router();
const bodyParser = require( 'body-parser' );
const {Leaderboard} = require('../models/leaderboardModel');
const validateToken = require("../middleware/validateToken");

const jsonParser = bodyParser.json();
 
//GET LEADERBOARD USER
function getleaderboard(req, res){

    Leaderboard
        .getLeaderboardTable()
        .then(result => {

            result.sort(function(a,b){return b.points - a.points || b.goals - a.goals;});

            return res.status(200).json(result);
        })
        .catch(err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
        });
}

//POST LEADERBOARD ADMIN
function postleaderboard(req, res) {

    teamsArr = req.body;

    for(var i = 0; i < teamsArr.length; i++){
        console.log(typeof(teamsArr[i].points))
        if(teamsArr[i].teamName == undefined || teamsArr[i].goals == undefined  || teamsArr[i].goalsAgainst == undefined || teamsArr[i].points == undefined ){
            res.statusMesagge = "One of this parameters is missing in the request: 'teamName', 'goals', 'goalsAgains', 'points'";
            return res.status(406).end(); //not acceptable
        }

        let newTeam = {
            teamName: String(teamsArr[i].teamName), 
            goals: Number(teamsArr[i].goals),
            goalsAgainst: Number(teamsArr[i].goalsAgainst),
            points:Number(teamsArr[i].points)
        }

        Leaderboard
        .postLeaderboardTable (newTeam)
        .then(result =>{
            return res.status(201).json(newTeam);
        })
        .catch( err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
          });
    }
}
 
//DELETE LEADERBOARD ADMIN
function deleteleaderboard(req, res){

    Leaderboard
        .deleteTable()
        .then(result =>{
            return res.status(200).json(result);
        })
        .catch(err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
        });

}
 
router.get("/table", getleaderboard);
router.post("/table", validateToken, jsonParser, postleaderboard);
router.delete("/table", validateToken, deleteleaderboard);
 
module.exports = router;

//GET COMMENTS USERS endpoint: http://localhost:8080/leaderboard/table
//POST COMMENTS USERS endpoint: http://localhost:8080/leaderboard/table
//DELETE COMMENTS ADMIN endpoint: http://localhost:8080/leaderboard/table
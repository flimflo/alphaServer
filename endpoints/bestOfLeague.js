const router = require("express").Router();
const bodyParser = require( 'body-parser' );
const {bestOfLeague} = require('../models/bestOfLeagueModel');
const validateToken = require("../middleware/validateToken");

const jsonParser = bodyParser.json();

//GET BEST OF LEAGUE 
function getBestOfLeague(req, res){

    bestOfLeague
      .getBestOfLeague()
      .then(results => {

          return res.status(200).json(results);
      })
      .catch(err =>{
          res.statusMessage = "Something is wrong with the Database. Try again later.";
          return res.statusCode(500).end();
      });
}

//POST BEST OF LEAGUE
function postBestOfLeague(req, res) {

  bestOfLeague
    .deletebestOfLeague()
    .then(result =>{

      infoArr = req.body.info;

      if(infoArr.length != 4){
        res.statusMesagge = "Array must be complete";
        return res.status(406).end(); //not acceptable
      }

      for(var i = 0; i < infoArr.length; i++){

          if(infoArr[i].title == undefined || infoArr[i].image_url == undefined  || infoArr[i].subtitle == undefined){
              res.statusMesagge = "One of this parameters is missing in the request: 'title', 'image_url', 'subtitle'";
              return res.status(406).end(); //not acceptable
          }

          let newCard = {
              title: String(infoArr[i].title),
              image_url: String(infoArr[i].image_url),
              subtitle: String(infoArr[i].subtitle)
          }

      bestOfLeague
        .postBestOfLeague(newCard)
        .then(result =>{
            return res.status(201).json(result);
        })
        .catch( err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
          });
    }

            return res.status(200).json(result);
        })
        .catch(err =>{
            res.statusMessage = "Something is wrong with the Database. Try again later.";
            return res.statusCode(500).end();
        });
}

router.get("/", getBestOfLeague);
router.post("/", validateToken, jsonParser, postBestOfLeague);

module.exports = router;

//GET BEST OF LEAGUE  endpoint: http://localhost:8080/api/best
//POST BEST OF LEAGUE ADMIN endpoint: http://localhost:8080/api/best
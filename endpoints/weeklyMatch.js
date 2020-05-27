const router = require("express").Router();
const bodyParser = require( 'body-parser' );
const {weeklyMatch} = require('../models/weeklyMatchModel');
const validateToken = require("../middleware/validateToken");

const jsonParser = bodyParser.json();

//GET NEWS
function getWeeklyMatches(req, res){

    weeklyMatch
      .getWeeklyMatch()
      .then(results => {

          results.sort((a, b) => {
            let da = new Date(a.date_created),
                db = new Date(b.date_created);
            return db - da;
          });

          results.forEach(element => {
            element.date = element.date_created.toUTCString()
          });

          return res.status(200).json({results});
      })
      .catch(err =>{
          res.statusMessage = "Something is wrong with the Database. Try again later.";
          return res.statusCode(500).end();
      });
}

//POST NEW ADMIN
function postWeeklyMatch(req, res) {

  let title = req.body.title;
  let image_url = req.body.image_url;
  let content = req.body.content

  if(!title || !content){
      res.statusMesagge = "One of this parameters is missing in the request: 'title', 'content'";
      return res.status(406).end(); //not acceptable
  }

  let newWeeklyMatch = {
      title: String(title),
      image_url: String(image_url),
      content: String(content)
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
}

router.get("/", getWeeklyMatches);
router.post("/", jsonParser, postWeeklyMatch);//validateToken, jsonParser, postWeeklyMatch);

module.exports = router;

//GET COMMENTS USERS endpoint: http://localhost:8080/leaderboard/table
//POST COMMENTS USERS endpoint: http://localhost:8080/leaderboard/table
//DELETE COMMENTS ADMIN endpoint: http://localhost:8080/leaderboard/table
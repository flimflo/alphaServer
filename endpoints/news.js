const router = require("express").Router();
const bodyParser = require( 'body-parser' );
const {News} = require('../models/newsModel');
const validateToken = require("../middleware/validateToken");

const jsonParser = bodyParser.json();

//GET NEWS
function getNews(req, res){

    News
      .getNews()
      .then(articles => {

          articles.sort((a, b) => {
            let da = new Date(a.date_created),
                db = new Date(b.date_created);
            return db - da;
          });

          articles.forEach(element => {
            element.date = element.date_created.toUTCString()
          });

          return res.status(200).json({articles});
      })
      .catch(err =>{
          res.statusMessage = "Something is wrong with the Database. Try again later.";
          return res.statusCode(500).end();
      });
}

//POST NEW ADMIN
function postNew(req, res) {

  let title = req.body.title;
  let image_url = req.body.image_url;
  let content = req.body.content

  if(!title || !content){
      res.statusMesagge = "One of this parameters is missing in the request: 'title', 'content'";
      return res.status(406).end(); //not acceptable
  }

  let New = {
      title: String(title),
      image_url: String(image_url),
      content: String(content)
  }

    News
      .postNews(New)
      .then(result =>{
          return res.status(201).json(New);
      })
      .catch( err =>{
          res.statusMessage = "Something is wrong with the Database. Try again later.";
          return res.statusCode(500).end();
        });
}

router.get("/", getNews);
router.post("/", validateToken, jsonParser, postNew);

module.exports = router;

//GET COMMENTS USERS endpoint: http://localhost:8080/leaderboard/table
//POST COMMENTS USERS endpoint: http://localhost:8080/leaderboard/table
//DELETE COMMENTS ADMIN endpoint: http://localhost:8080/leaderboard/table
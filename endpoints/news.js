const router = require("express").Router();
const bodyParser = require( 'body-parser' );
const {Leaderboard} = require('../models/leaderboardModel');
const validateToken = require("../middleware/validateToken");

const jsonParser = bodyParser.json();

//GET LEADERBOARD USER
function getNews(req, res){
  res.json({
    articles: [
      {
        title: "News Article 1",
        image_url: "https://i.imgur.com/I20J1iN.jpg",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus mauris nec facilisis sollicitudin. In tellus lacus, viverra quis lacinia eget, placerat id metus. Morbi scelerisque justo et orci interdum rutrum. Maecenas dapibus viverra odio, quis viverra elit bibendum non. Morbi at bibendum nulla, vel bibendum eros. Quisque vel felis ligula. Sed laoreet ex sit amet auctor pretium. Aenean semper ultrices eros at bibendum. Duis vitae tellus nec sem tincidunt condimentum non eget mauris. Duis aliquet mi vel aliquet rutrum. Curabitur vitae ornare ligula. Fusce eget eleifend arcu. Phasellus tempus ut urna sed venenatis. Proin mi elit, iaculis et ipsum id, scelerisque suscipit diam. Fusce vitae malesuada est, quis mattis ipsum.",
        date: (new Date()).toUTCString()
      },
      {
        title: "News Article 2",
        image_url: "https://i.imgur.com/I20J1iN.jpg",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus mauris nec facilisis sollicitudin. In tellus lacus, viverra quis lacinia eget, placerat id metus. Morbi scelerisque justo et orci interdum rutrum. Maecenas dapibus viverra odio, quis viverra elit bibendum non. Morbi at bibendum nulla, pasfpam vel felis ligula. Sed laoreet ex sit amet auctor pretium. Aenean semper ultrices eros at bibendum. Duis vitae tellus nec sem tincidunt condimentum non eget mauris. Duis aliquet mi vel aliquet rutrum. Curabitur vitae ornare ligula. Fusce eget eleifend arcu. Phasellus tempus ut urna sed venenatis. Proin mi elit, iaculis et ipsum id, scelerisque suscipit diam. Fusce vitae malesuada est, quis mattis ipsum.",
        date: (new Date()).toUTCString()
      }
    ]
  })
}

//POST LEADERBOARD ADMIN
function postleaderboard(req, res) {

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

router.get("/", getNews);
router.post("/table", validateToken, jsonParser, postleaderboard);
router.delete("/table", validateToken, deleteleaderboard);

module.exports = router;

//GET COMMENTS USERS endpoint: http://localhost:8080/leaderboard/table
//POST COMMENTS USERS endpoint: http://localhost:8080/leaderboard/table
//DELETE COMMENTS ADMIN endpoint: http://localhost:8080/leaderboard/table
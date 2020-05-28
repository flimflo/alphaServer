const router = require("express").Router();
const bodyParser = require( 'body-parser' );
const {Media} = require('../models/mediaModel');
const validateToken = require("../middleware/validateToken");

const jsonParser = bodyParser.json();

//GET MEDIA PHOTOS
function getMediaPhoto(req, res){

    Media
      .getMediaPhoto({"media_type":"foto"})
      .then(mediaPhotos => {

          mediaPhotos.sort((a, b) => {
            let da = new Date(a.date_created),
                db = new Date(b.date_created);
            return db - da;
          });

          mediaPhotos.forEach(element => {
            element.date = element.date_created.toUTCString()
          });
          console.log({mediaPhotos});

          return res.status(200).json({mediaPhotos});
      })
      .catch(err =>{
          res.statusMessage = "Something is wrong with the Database. Try again later.";
          return res.statusCode(500).end();
      });
}

//GET MEDIA VIDEOS
function getMediaVideo(req, res){

    Media
      .getMediaVideo({"media_type":"video"})
      .then(mediaVideos => {

        mediaVideos.sort((a, b) => {
            let da = new Date(a.date_created),
                db = new Date(b.date_created);
            return db - da;
          });

          mediaVideos.forEach(element => {
            element.date = element.date_created.toUTCString()
            element.image_url = element.image_url.replace(/watch\?v=/, 'embed/');
          });

          return res.status(200).json({mediaVideos});
      })
      .catch(err =>{
          res.statusMessage = "Something is wrong with the Database. Try again later.";
          return res.statusCode(500).end();
      });
}

//POST MEDIA ADMIN
function postMedia(req, res) {

    let title = req.body.title;
    let image_url = req.body.image_url;
    let media_type = req.body.media_type;
    let content = req.body.content

    if(!title || !image_url || !media_type){
        res.statusMesagge = "One of this parameters is missing in the request: 'title', 'image_url','media_type'";
        return res.status(406).end(); //not acceptable
    }

    let newMedia = {
        title: String(title),
        image_url: String(image_url),
        media_type: String(media_type),
        content: String(content)
    }

    Media
      .postMedia(newMedia)
      .then(result =>{
          return res.status(201).json(newMedia);
      })
      .catch( err =>{
          res.statusMessage = "Something is wrong with the Database. Try again later.";
          return res.statusCode(500).end();
        });
}

router.get("/photos", getMediaPhoto);
router.get("/videos", getMediaVideo);
router.post("/", jsonParser, postMedia);//validateToken, jsonParser, postMedia);

module.exports = router;

//GET MEDIA PHOTOS endpoint: http://localhost:8080/api/media/photos
//GET MEDIA VIDEOS endpoint: http://localhost:8080/api/media/videos
//POST MEDIA ADMIN endpoint: http://localhost:8080/api/media
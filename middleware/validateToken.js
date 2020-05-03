const TOKEN = "password12345";

function validateToken(req, res, next){

    let token_bearer = req.headers.authorization;
    let token_header = req.headers['book-api-key'];
    let token_param = req.query.apiKey;
  
    console.log(req.headers);

    if(token_bearer){
        console.log("bearer")
        if(token_bearer == `Bearer ${TOKEN}`){
            //res.status(200).end();
            next();
            return
        }
    }

    if(token_header){
        console.log("header")
        if(token_header == TOKEN){
            //res.status(200).end();
            next();
            return
        }
    }

    if(token_param){
        console.log("param")
        if(token_param == TOKEN){
            //res.status(200).end();
            next();
            return
        }
    }
  

    res.statusMesagge = "The authorization TOKEN must be sent";
    return res.status(401).end(); //Unauthorized
    
  }

  module.exports = validateToken;

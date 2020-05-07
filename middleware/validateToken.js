const { verify } = require('jsonwebtoken')

const SECRET = "secret:CHANGEME"

function extractToken(req) {
    let auth_header = req.headers.authorization;
    let token_header = req.headers['book-api-key'];
    let token_param = req.query.apiKey;
    let bearerToken = null
    if (auth_header) {
        bearerToken = auth_header.split(' ')[1]
    }

    return bearerToken || token_header || token_param
}
function validateToken(req, res, next){
    const token = extractToken(req)

    if (token) {
        try {
            verify(token, SECRET)
            return next()
        } catch(err) {
            console.log(err)
            return res.status(402).end(); //Unauthorized
        }
    }


    res.statusMesagge = "The authorization TOKEN must be sent";
    return res.status(401).end(); //Unauthorized
  }

  module.exports = validateToken;

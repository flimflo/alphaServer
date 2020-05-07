const { Router } = require('express')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const Users = require('../models/User')
const SECRET = "secret:CHANGEME"

function getJWT() {
  return sign({}, SECRET, { expiresIn: '1hr' })
}

const router = new Router()

router.post('/auth', (req, res) => {
  const {email, password} = req.body

  Users.getUserByEmail(email)
    .then(user => {
      if (!user) {
        return res.sendStatus(403)
      }

      bcrypt.compare(password, user.passwordHash).then(valid => {
        if (valid) {
          return res.json({ token: getJWT() })
        } else {
          return res.sendStatus(403)
        }
      })
    })
})

module.exports = router
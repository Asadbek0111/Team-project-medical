const router = require('express').Router()
const Login = require('../controllers/Login.js')

router
  .route('/')
  .get(Login.GET)
  .post(Login.POST)

module.exports = router
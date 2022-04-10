const router = require('express').Router()
const Clinics = require('../controllers/Clinics.js')

router
  .route('/')
  .get(Clinics.GET)
  .post(Clinics.POST)
  .put(Clinics.PUT)
  .delete(Clinics.DELETE)

module.exports = router
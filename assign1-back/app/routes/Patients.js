const router = require('express').Router()
const Patients = require('../controllers/Patients.js')

router
  .route('/')
  .get(Patients.GET)
  .post(Patients.POST)
  .put(Patients.PUT)
  .delete(Patients.DELETE)

module.exports = router
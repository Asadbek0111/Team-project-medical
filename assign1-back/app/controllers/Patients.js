const Patients = require("../models/Patients")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("./Login")

module.exports = {
    GET: ('/', async (req, res) => {
        try {
            // jwt.verify(req.headers.token, SECRET_KEY)
            res.status(200).json({code:200, data:await Patients.patients(req), message:'got successfully'})
        } catch (error) {
           res.status(400).json({code:400, error: error.message})
        }
    }),
    POST: ('/', async (req, res) => {
        try {
            // jwt.verify(req.headers.token, SECRET_KEY)
            res.status(200).json({code:200, data:await Patients.createPatient(req.body), message: 'post successfully'})
        }
        catch(error){
      res.status(400).json({code:400, error: error.message})
        }
    }),
    PUT: ('/', async (req, res) => {
        try {
            jwt.verify(req.headers.token, SECRET_KEY)
            res.status(200).json({code:200, data:await Patients.updatePatient(req.body), message: 'updated successfully'})
        } catch (error) {
            res.status(400).json({code:400, error: error.message})
        }
    }),
    DELETE: ('/', async (req, res) => {
        try {
            jwt.verify(req.headers.token, SECRET_KEY)
            res.status(200).json({code:200, data: await Patients.deletePatient(req.body), message: 'deleted successfully'})
        } catch (error) {
            res.status(400).json({code:400, error: error.message})
        }
    })
}
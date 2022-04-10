const Clinics = require("../models/Clinics")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("./Login")

module.exports = {
    GET: ('/', async (req, res) => {
        try {
            res.json({code:200, data: await Clinics.clinics(req), message:"got successfully"})
        } catch (error) {
            res.status(400).json({code:400, error: error.message})
        }
    }),
    POST: ('/', async (req, res) => {
        try {
            // jwt.verify(req.headers.token, SECRET_KEY)
            res.json({code: 200, data: await Clinics.createClinic(req), message:"posted successfully"})
        } catch (error) {
           res.status(400).json({code:400, error: error.message})
        }
    }),
    PUT: ('/', async (req, res) => {
        try {
            // jwt.verify(req.headers.token, SECRET_KEY)
            res.json({code: 200, data: await Clinics.updateClinic(req), message:"updated successfully"})
        } catch (error) {
           res.status(400).json({code:400, error: error.message})
        }
    }),
    DELETE: ('/', async (req, res) => {
        try {
            jwt.verify(req.headers.token, SECRET_KEY)
            res.json({code: 200, data: await Clinics.deleteClinic(req.body),message:"deleted successfully"})
        } catch (error) {
           res.status(400).json({code:400, error: error.message})
        }
    })
}
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors")

// PAGES
const Patients = require('./routes/Patients.js')
const Clinics = require('./routes/Clinics.js')
const Login = require('./routes/Login.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static("public"))

const allowCrossDomain = function (req, res, next) {
  const allowOrigin = req.headers.origin || "*";
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authentication, x-access-token, Accept, Origin");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  if (req.method === 'OPTIONS') {
    res.status(200).send();
  } else {
    next();
  }
};

app.use(cors({
  "origin": "*"
}))

app.options('*', cors())


app.use(allowCrossDomain);

// set the routes
app.use('/clinics', Clinics)
app.use('/patients', Patients)
app.use('/login', Login)


// production error handler
// no stacktraces leaked to user
app.use((err, _, res, next) => {
  console.log(err)
  next()
})

module.exports = app
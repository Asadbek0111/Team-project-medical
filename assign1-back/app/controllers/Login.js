const jwt = require("jsonwebtoken")
const SECRET_KEY = 'APPLE'

const { fetchOne, fetch} =  require("../Library/database/postgres")

module.exports = {
    GET:('/', async (req, res) => {
        try {         
                 let found = jwt.verify(req.headers.token, SECRET_KEY)
                 if(found){
                        res.status(200).json({code:200, message:'authorized successfully'})
                 }
                 else {
                    res.status(400).json({code:400, message:'authorize failed'}) 
                 }
            
        } catch (error) {
           res.status(400).json({code:400, error: error.message})
        }
    }),
    POST: ('/', async (req, res) => {
        try {
            const { username, password } = req.body
            const user = await fetchOne(`select * from users where username = $1 and password = $2`, username, password)
            if(user) {
                res.json(
                    { code: 200, token : jwt.sign(user, SECRET_KEY), message: "successfully logged in"}
                )
            }
            else {
                res.status(400).json({code:400, error: 'Forbidden error'})
            }
        } catch (error) {
            res.status(400).json({code:400, error: error.message})
        }
    })
}

module.exports.SECRET_KEY = SECRET_KEY
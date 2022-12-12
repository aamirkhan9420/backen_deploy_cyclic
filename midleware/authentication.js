const e = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1]

    if (token) {
        const decoded = jwt.verify(token, process.env.KEY)
        console.log(decoded.userId)
        if (decoded) {
            req.body.userId = decoded.userId
            next()
        }else{
            res.send({"msg":"something went wrong"})
        }


    } else {
        res.send({ "msg": "some err occoured" })
    }
}
module.exports = { authentication }
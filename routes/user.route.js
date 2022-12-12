const express = require("express")

const { UserModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const app = express()
const UserRouter = express.Router()
require("dotenv").config()
app.use(express.json())
UserRouter.get("/", (req, res) => {
    res.send({ "msg": "wellcome to user page" })
})

UserRouter.post("/signup", (req, res) => {
    const { name, email, password } = req.body
    console.log(name,email,password)
    try {
        bcrypt.hash(password, 5, async (err, hashpassword) => {
            if (hashpassword) {
                const new_user = new UserModel({ name, email, password: hashpassword })
                await new_user.save()
                res.send({ "msg": "signup successful" })
            }else{
                res.send({ "msg":`some err occour while signup :${err}` })
            }
        })

    } catch (error) {
        res.send({ "err": `some error while making signup request: ${error}` })
    }
})
UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })

        if (user.length > 0) {
            const hashpassword = user[0].password
            bcrypt.compare(password, hashpassword, (err, result) => {
                if (result) {
                    const token = jwt.sign({ "userId": user[0]._id }, process.env.KEY, (err, token) => {
                        if (token) {
                            res.send({ "status": "login successful", "msg": token })
                        }
                    })
                } else {
                    res.send({ "msg": `invalid user` })
                }
            })
        }


    } catch (error) {
        res.send({ "msg": `some err while login ${error}` })
    }

})
module.exports = { UserRouter }
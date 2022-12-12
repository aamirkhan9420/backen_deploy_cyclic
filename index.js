const express=require("express")
const { connection } = require("./config/db")
const {NotesRouter}=require("./routes/notes.route")
const {authentication}=require("./midleware/authentication")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors({
      origin: "*",
    }))
require("dotenv").config()

const {UserRouter}=require("./routes/user.route")

app.get("/",(req,res)=>{
    res.send("wellcome to home")
})
app.use("/user",UserRouter)
app.use(authentication)
app.use("/notes",NotesRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`listening on port ${process.env.PORT}`)
    } catch (error) {
        console.log(`some error while making connection ${error}`)
    }
})
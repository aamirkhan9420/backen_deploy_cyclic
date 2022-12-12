const express = require("express")
const { UserModel } = require("../models/user.model")
const { NotesModel } = require("../models/notes.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const app = express()
const NotesRouter = express.Router()
require("dotenv").config()
app.use(express.json())
NotesRouter.get("/", async(req, res) => {
 try {
    const notes=await NotesModel.find()
    res.send({ "msg": notes })
 } catch (error) {
    res.send({"msg":`unable to fetch ${error}`})
 }
    
})
NotesRouter.post("/create", async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        const new_notes = new NotesModel(data)
        await new_notes.save()
        res.send({ "msg": "notes added" })
    } catch (error) {
        res.send({ "msg": `some err occoured during notes post request ${error}` })
    }

})
NotesRouter.patch("/update/:id", async(req, res) => {
    const data=req.body
    const id=req.params.id
    const userId=req.body.userId
    const user=await NotesModel.findOne({_id:id})

    try {
         if(user.userId===userId){
             await NotesModel.findByIdAndUpdate({_id:id},data)
             res.send({"msg":"updated successful"})
         }
       else{
        res.send({"msg":"not authorized"})

       }
        
    } catch (error) {
        res.send({"msg":`something went wrong while updating ${error}`})
        
    }
   
})
NotesRouter.delete("/delete/:id", async(req, res) => {

    const id=req.params.id
    const userId=req.body.userId
    const user=await NotesModel.findOne({_id:id})
    try {
        if(user.userId===userId){
              await NotesModel.findByIdAndDelete({_id:id})
        res.send({"msg":"deleted successfuly"})
        }else{
        res.send({"msg":"not authorized"})

        }
      
        
    } catch (error) {
        res.send({"msg":`something went wrong while deleting or pls signup ${error}`})
        
    }
})
module.exports = { NotesRouter }
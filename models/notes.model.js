const mongoose=require("mongoose")
const noteschema=mongoose.Schema({
    title:String,
    note:String,
    category:[],
    userId:String
  
})
const NotesModel=mongoose.model("note",noteschema)
module.exports={NotesModel}
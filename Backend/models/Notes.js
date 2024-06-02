const mongoose= require('mongoose')
const {Schema} = mongoose; // it is important to add if u want to use any schema
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user' //User.js ka foregin key banane ke liye ye krna prega
    },
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true,
    
},
tag:{
    type:String,
    default: "General"
},
date:{
    type:Date,
    default:Date.now
}
  });
const Note= mongoose.model('notes',NotesSchema);
module.exports= Note;
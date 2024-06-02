const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
//Route 1:   Get all the notes using GET "/api/auth/fetchallnotes".Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }

})

//Route 2:   Add a new note using POST "/api/auth/addnote".Login Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {    //Destructuring concept:
        const { title, description, tag } = req.body;
        //If there is error : return thr Bad Request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //since if agr koi error nhi h tb anb m new note save krungi:
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }

})

//Route 3:   Update the existing note using PUT "/api/auth/updatenote".Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
try{    const { title, description, tag } = req.body; //user has entered this
    //Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    //Find a note to be updated and update it:
    //req.params.id means that router ka parameter id ko fetch kro
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }
    //note.user gives the id of the user that own that note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    res.json({ note });}
    catch(err){
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
})

//Route 4:   Delete the existing note using DELETE"/api/auth/deletenote".Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
try{  
    //Find a note to be deleted and delete it:
    //req.params.id means that router ka parameter id ko fetch kro
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    //Allow deletion on;y if user own the note
    //note.user gives the id of the user that own that note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({"Success": "Note has been deleted", note:note });}
    catch(err){
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router
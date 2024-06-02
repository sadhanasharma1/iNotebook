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

module.exports = router
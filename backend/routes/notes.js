const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE-1: Get all the notes using: GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-2: Add a new notes using: POST "/api/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;

        // If there are bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save()

        res.json(savenote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-3: Update a exist notes using: PUT "/api/notes/updatenote/:id"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        // Create a exist note new data
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        // Find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(400).send("Not Found")}

        if (note.user.toString() !== req.user.id) {
            return res.status(400).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

// ROUTE-4: Delete a exist notes using: DELETE "/api/notes/deletenote/:id"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be updated and delete it.
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(400).send("Not Found")}

        // Allow deletion only if user own this
        if (note.user.toString() !== req.user.id) {
            return res.status(400).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({success: "Note has been deleted."});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router
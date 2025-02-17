import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:2000"
    const notesInital = [];
    const [notes, setNotes] = useState(notesInital)

    // Get all a note
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            } 
        });
        const json = await response.json()
        setNotes(json)
    }

    // Add a note
    const addNote = async (note) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify(note)
        });
        const newNote = await response.json();
        setNotes(notes.concat(newNote))
    }

    // Edit a note
    const editNote = async (note) => {
        const response = await fetch(`${host}/api/notes/updatenote/${note._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({title: note.etitle, description: note.edescription, tag: note.etag})
        });
        const updateNote = await response.json();
        console.log(updateNote);
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === note._id) {
                newNotes[index].title = note.etitle;
                newNotes[index].description = note.edescription;
                newNotes[index].tag = note.etag;

                break;
            }
        }
        setNotes(newNotes);
    }

    // Delete a note
    const deleteNote = async (id) => {
        //TODO: API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const json = await response.json()
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
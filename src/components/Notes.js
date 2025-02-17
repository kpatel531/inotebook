import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context;
    let history = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            getNotes()
        } else {
            history("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: ""
    })

    const updateNote = (currentNote)  => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    }
    const handleClick = (e) => {
        editNote({_id: note.id, etitle: note.etitle, edescription: note.edescription, etag: note.etag});
        refClose.current.click();
        props.showAlert("Update successfully", "success");
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }
    return (
        <>
        <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Lunch Edit Form Btn</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form className="my-3">
                        <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Title</label>
                            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={3} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edescription" className="form-label">Description</label>
                            <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="etag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="row my-3">
        <h2>Your Note</h2>
        <div className="container mx-2">
        {!notes.length && "No notes to display"}
        </div>
        {notes.map((note, index) => {
            return <Noteitem key={index} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        })}
        </div>
        </>   
    )
}

export default Notes

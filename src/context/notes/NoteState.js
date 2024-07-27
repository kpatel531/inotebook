import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const notesInital = [
        {
          "_id": "66a4a091350555b05096255d",
          "user": "66a4896040412506a3b3903e",
          "title": "My title",
          "description": "Please wake up early",
          "tags": "General",
          "date": "1722065041427",
          "__v": 0
        },
        {
          "_id": "66a4a091350555b05096255f",
          "user": "66a4896040412506a3b3903e",
          "title": "My title",
          "description": "Please wake up early",
          "tags": "General",
          "date": "1722065041697",
          "__v": 0
        },
        {
          "_id": "66a4a091350555b050962561",
          "user": "66a4896040412506a3b3903e",
          "title": "My title",
          "description": "Please wake up early",
          "tags": "General",
          "date": "1722065041870",
          "__v": 0
        },
        {
          "_id": "66a4b0c4980961931a07c55a",
          "user": "66a4896040412506a3b3903e",
          "title": "My title",
          "description": "Please wake up early",
          "tags": "General",
          "date": "1722069188786",
          "__v": 0
        },
        {
          "_id": "66a4a091350555b050962561",
          "user": "66a4896040412506a3b3903e",
          "title": "My title",
          "description": "Please wake up early",
          "tags": "General",
          "date": "1722065041870",
          "__v": 0
        },
        {
          "_id": "66a4b0c4980961931a07c55a",
          "user": "66a4896040412506a3b3903e",
          "title": "My title",
          "description": "Please wake up early",
          "tags": "General",
          "date": "1722069188786",
          "__v": 0
        },
        {
        "_id": "66a4a091350555b050962561",
        "user": "66a4896040412506a3b3903e",
        "title": "My title",
        "description": "Please wake up early",
        "tags": "General",
        "date": "1722065041870",
        "__v": 0
        },
        {
        "_id": "66a4b0c4980961931a07c55a",
        "user": "66a4896040412506a3b3903e",
        "title": "My title",
        "description": "Please wake up early",
        "tags": "General",
        "date": "1722069188786",
        "__v": 0
        }
      ]

    const [notes, setNotes] = useState(notesInital)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
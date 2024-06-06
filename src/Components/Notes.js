import React, {useContext} from 'react'
import NoteItem from './NoteItem'
import noteContext from "../context/notes/noteContext"
const Notes = () => {
    const context = useContext(noteContext)
    const {notes,setNotes}= context;
  return (
    <div className="row my-3">
        <h1>Your Notes</h1>
      {notes.map((notes)=>{
        return <NoteItem note={notes}/>;
      })}
    </div>
  )
}

export default Notes

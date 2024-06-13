import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext"
const NoteItem = (props) => {
    const {note,updateNote}=props;
    const context = useContext(noteContext)
    const {deleteNote}= context;
    // const {editNote}=context;
  return (
    <div className="col-md-3">

      <div className="card my-3">
 
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-regular fa-pen-to-square mx-3" onClick={()=>{
      updateNote(note)
    }}></i>
    <i className="fa-solid fa-trash mx-3" onClick={()=>{
deleteNote(note._id)
    }}></i>
    </div>
    <p className="card-text"> {note.description}</p>
    <p className="card-text opacity-75"> {note.tag}</p>

   
  </div>
</div>
    </div>
  )
}

export default NoteItem

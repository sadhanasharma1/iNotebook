import { UNSAFE_DataRouterStateContext } from "react-router-dom";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial)



  //Get all  Notes
  const getNotes = async () => {
    //TODO: API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzcxNjBhMTc2OTUwZWYyZTNlNDQ1In0sImlhdCI6MTcxNzMzNDM5Mn0.0V5QJHgc25nY9AJntsqjH1WGWhcqw8mRBUWA4baFcpQ"
      }
    });
   const json = await response.json()
  console.log(json);
  setNotes(json)
  }



  //Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzcxNjBhMTc2OTUwZWYyZTNlNDQ1In0sImlhdCI6MTcxNzMzNDM5Mn0.0V5QJHgc25nY9AJntsqjH1WGWhcqw8mRBUWA4baFcpQ"


      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      "_id": "665cb0f4dae3bb2548dcb1e6",
      "user": "665c7160a176950ef2e3e445",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-06-02T17:50:44.433Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote = async (id) => {
    //  console.log("To delete the note with id: " + id);
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzcxNjBhMTc2OTUwZWYyZTNlNDQ1In0sImlhdCI6MTcxNzMzNDM5Mn0.0V5QJHgc25nY9AJntsqjH1WGWhcqw8mRBUWA4baFcpQ"


      }
    });
  const json = response.json();
  console.log(json)
    //Logic to delete in client:
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }



  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //  console.log("To edit the note with id: " + id);
    //TODO: API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzcxNjBhMTc2OTUwZWYyZTNlNDQ1In0sImlhdCI6MTcxNzMzNDM5Mn0.0V5QJHgc25nY9AJntsqjH1WGWhcqw8mRBUWA4baFcpQ"


      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();


    //Logic to edit in clint:
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }


  return (
    // jo bhi value pass krni h usee value={ } ke andar daal do
    // jabhi kisi cheezo ko hm ye ctreated context (NoteContext) ke andar wrap krenge to
    //automatically sare children aa jaenbge   
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
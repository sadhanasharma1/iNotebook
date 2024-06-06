import { UNSAFE_DataRouterStateContext } from "react-router-dom";
import NoteContext from "./noteContext";
import {useState} from "react";
const NoteState = (props) => {
    const notesInitial= [
        {
          "_id": "665cb0b0dae3bb2548dcb1df",
          "user": "665c7160a176950ef2e3e445",
          "title": "New Updated note",
          "description": "my-description",
          "tag": "first note personal",
          "date": "2024-06-02T17:49:36.020Z",
          "__v": 0
        },
        {
          "_id": "665cb0f4dae3bb2548db1e6",
          "user": "665c7160a176950ef2e3e445",
          "title": "my-title2",
          "description": "my-description2",
          "tag": "first note personal2",
          "date": "2024-06-02T17:50:44.433Z",
          "__v": 0
        },
        {
          "_id": "665cb0f4dae3bb2548dcb1e",
          "user": "665c7160a176950ef2e3e445",
          "title": "my-title2",
          "description": "my-description2",
          "tag": "first note personal2",
          "date": "2024-06-02T17:50:44.433Z",
          "__v": 0
        },
        {
          "_id": "665cb0f4dae3bb2548dcb1e68",
          "user": "665c7160a176950ef2e3e445",
          "title": "my-title2",
          "description": "my-description2",
          "tag": "first note personal2",
          "date": "2024-06-02T17:50:44.433Z",
          "__v": 0
        },
        {
          "_id": "665cb0f4dae3bb2548dcb1e7",
          "user": "665c7160a176950ef2e3e445",
          "title": "my-title2",
          "description": "my-description2",
          "tag": "first note personal2",
          "date": "2024-06-02T17:50:44.433Z",
          "__v": 0
        },
        {
          "_id": "665cb0f4dae3bb2548dcb1e6",
          "user": "665c7160a176950ef2e3e445",
          "title": "my-title2",
          "description": "my-description2",
          "tag": "first note personal2",
          "date": "2024-06-02T17:50:44.433Z",
          "__v": 0
        },
        {
          "_id": "665cb0f4dae3bb2548dcb1e5",
          "user": "665c7160a176950ef2e3e445",
          "title": "my-title2",
          "description": "my-description2",
          "tag": "first note personal2",
          "date": "2024-06-02T17:50:44.433Z",
          "__v": 0
        }
      ];

      const [notes,setNotes]= useState(notesInitial)

    return (
        // jo bhi value pass krni h usee value={ } ke andar daal do
        // jabhi kisi cheezo ko hm ye ctreated context (NoteContext) ke andar wrap krenge to
        //automatically sare children aa jaenbge   
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
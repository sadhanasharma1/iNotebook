import NoteContext from "./noteContext";
import {useState} from "react";
const NoteState = (props) => {

    return (
        // jo bhi value pass krni h usee value={ } ke andar daal do
        // jabhi kisi cheezo ko hm ye ctreated context (NoteContext) ke andar wrap krenge to
        //automatically sare children aa jaenbge   
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
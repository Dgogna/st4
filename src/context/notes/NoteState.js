import React ,{useState} from "react";
import NoteContext from "./noteContext";


const NoteState = (props)=>{

    // const host="https://agile-fortress-39061.herokuapp.com"
    const host="http://localhost:5000";

    const notesInitial=[];

    const[notes,setNotes]=useState(notesInitial);
    const[user,setUser]=useState("");

    //   GET a note
    const getNotes=async ()=>{
        // API call that we have made
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem("token")
            }
          });
    
          const json=await response.json();
        //   console.log(json);
          setNotes(json);

    }

    //   Add a note
    const addNote=async (title,description,tag)=>{
        // API call that we have made
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const json=await response.json();
        //   console.log(json);
          
        // console.log("adding a new note");
        // it is kust for the client side
        let note=json;

        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote=async(id)=>{
        // API call for deleting a note
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem("token")
            }
          });
          const json=await response.json();
          console.log(json);
        // console.log("deleter the note with id "+id);
        const newNotes=notes.filter((note)=>{ return note._id!==id});
        setNotes(newNotes);
    }
    // edit a note
    const editNote= async (id,title,description,tag)=>{
        // API call that we have made
        // console.log("note will be updated via api");
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const json= await response.json();
          console.log(json);
        //   Logic t edit in client

        let newNotes=JSON.parse(JSON.stringify(notes));
        for(var i=0;i<newNotes.length;i++){
            if(newNotes[i]._id===id){
                newNotes[i].title=title;
                newNotes[i].description=description;
                newNotes[i].tag=tag;
            }
        }
        // console.log(newNotes);
        setNotes(newNotes);
    }

    // fetch the current user
    const getUser= async ()=>{
        // if(localStorage.getItem("token")){
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem("token")
            }
          });
          const json= await response.json();
          setUser(json);
        //   console.log(json.name);
        //   return json.name;
    // }
    }


    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes,user,getUser}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;
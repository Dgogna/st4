import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
// import AddNote from "./AddNote";
import Noteitem from "./Noteitem"

const Notes = () => {

    const [editnote, setNote] = useState({ id:"" , edittitle: "", editdescription: "", edittag: "" });

    const Navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        } else {
            Navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ref = useRef(null);
    const closeRef=useRef(null);
    const updateNote = (currentNote) => {

        ref.current.click();
        // console.log(currentNote);
        setNote({id:currentNote._id  ,edittitle:currentNote.title , editdescription:currentNote.description , edittag:currentNote.tag})

    }

    const handleClick = (e) => {
        e.preventDefault();
        closeRef.current.click();
        // console.log("updating the note called" , editnote);
        editNote(editnote.id,editnote.edittitle,editnote.editdescription,editnote.edittag);
   
    }

    const onChange = (e) => {
        setNote({ ...editnote, [e.target.name]: e.target.value })
    }

    return (
        <div >
            <div className="text-center">
                <Link role="button" className="btn btn-dark" to="/addNote"> <h1>Add a Note <i className="fa-solid fa-plus"></i></h1></Link>
            </div>

            {/* <AddNote /> */}

            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="edittitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="edittitle" aria-describedby="emailHelp" autoComplete="off" name="edittitle" onChange={onChange} value={editnote.edittitle} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editdecription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="editdescription" name="editdescription" autoComplete="off" onChange={onChange} value={editnote.editdescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edittag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="edittag" name="edittag" autoComplete="off" onChange={onChange} value={editnote.edittag} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>




            <div className="row my-3">
                {/* <h2>Your Notes</h2> */}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note}></Noteitem>;
                })}
            </div>
        </div>

    )
};

export default Notes;
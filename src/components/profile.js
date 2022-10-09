import React,{useContext} from "react"
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Profile=()=>{
    const Navigate=useNavigate();
    const context=useContext(noteContext);
    const {user}=context;
    // console.log(user);

    return(
        <div>
            <h1>Hello {user.name}</h1>
            <h2>{user.email}</h2>
            <div>
                <button onClick={()=>{
                    Navigate("/");
                }} className="btn btn-primary"> back to Home</button>
            </div>
        </div>

    )
};

export default Profile

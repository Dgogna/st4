import React,{useState,useContext} from "react"
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Signup = () => {

    const Navigate=useNavigate();
    const context=useContext(noteContext);
    const {getUser}=context;

    const host="http://localhost:5000";

    const [credentials,setCredentials]=useState({name:"" , email:"",password:""});
    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log(credentials);
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name ,email:credentials.email,password:credentials.password}) 
          });
          const json= await response.json();
        //   console.log(json);
          if(json.authToken){
            localStorage.setItem("token",json.authToken);
            getUser();
            Navigate("/");
          }else{
            Navigate("/signup")
          }
          
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className="component">
            <h2>Sign up to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username </label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} value={credentials.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email </label>
                    <input type="email" className="form-control" id="email"  name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default Signup;
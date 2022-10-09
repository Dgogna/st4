import React,{useState,useContext} from "react"
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = () => {
    const Navigate=useNavigate();

    const context=useContext(noteContext);
    const {getUser}=context;


    const [credentials,setCredentials]=useState({email:"",password:""});

    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log(credentials);
        const response = await fetch("https://agile-fortress-39061.herokuapp.com/api/auth/login", {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password}) 
          });
          const json= await response.json();
        //   console.log(json);
          if(json.authToken){
            localStorage.setItem("token",json.authToken);
            getUser();
            Navigate("/");
          }else{
            Navigate("/Login")
          }
          
    }


    return (
        <div>
            
            <h2>Login to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email </label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={(e)=>{
                        setCredentials({...credentials,email:e.target.value})
                    }} value={credentials.email} />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={(e)=>{
                        setCredentials({...credentials,password:e.target.value})
                    }}  value={credentials.password}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default Login;
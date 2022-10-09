import React,{useContext,useEffect} from "react"
import { Link,useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";


const Navbar =  ()=>{
    const location=useLocation();
    // console.log(location.pathname);
    const Navigate=useNavigate();
    const context=useContext(noteContext);
    const {user,getUser}=context;
    
    // const name=getUser;
    useEffect(()=>{
        if(localStorage.getItem("token")){
            getUser();
        }else{
            Navigate("/login");
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    
    const handleLogout=()=>{
        localStorage.removeItem("token");
        Navigate("/login")
    }
    return(
        <>
            <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">


            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <h1><Link to="/" className={`nav-link px-2 ${location.pathname==="/"?"link-dark":"link-secondary"} `}>iNotebook{localStorage.getItem("token")?" - "+user.name:""}</Link></h1>
            </ul>

            {!localStorage.getItem("token")?<div className="col-md-3 text-end">
                <Link to="/login" role="button" className={`btn mx-2 ${location.pathname==="/login"?"btn-primary":"btn-outline-primary"} `}>Login</Link>
                <Link to="/signup" role="button" className={`btn mx-2 ${location.pathname==="/signup"?"btn-primary":"btn-outline-primary"} `}>Sign-up</Link>
            </div>:
            <div>
                {/* {getUser} */}
                
                {/* <span className="mx-2">{user.name}</span> */}
                <Link to="/profile" role="button" className="btn btn-success mx-2">{user.name}</Link>
                <button className="btn btn-primary" onClick={handleLogout}>Sign Out</button>
            </div>
            }
            </header>
        </div>
        </>
    )
}

export default Navbar;
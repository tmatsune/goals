
import "./login.css";
import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import GOAL from "../../images3/businessman.svg"
import { useNavigate } from "react-router";

function LoginPage(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const {setCurrentUser, currentUser} = useContext(UserContext)
    const [show, setShow] = useState(true)
    const navigate = useNavigate();

    const reset = () => {
        setPass("");
        setEmail("");
    }

    const logInHandler = async() => {
        const url = "https://gin-production-3fb4.up.railway.app/v1/user/login";
        const userInput = {
            email: email,
            password: pass
        }
        const res = await fetch(url, {
            method:"post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userInput)
        }).then(res => res.json());
        console.log(res)
        reset();
        if(Object.keys(res).length > 1){
            navigate("/profile")
            setCurrentUser(res);
        }else{
            alert("wrong username or password")
        }
        
    }
    const toggle = () => {
        setShow(!show)
    }

    return(
        <div id="loginMain">
            <img alt='' src={GOAL} id="logImg"></img>
            <div id="logWrapper">
            {
            show ? (
            <div id="login">
                <h1>Log In</h1>
                <div>
                    <input value={email} placeholder="email" onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <input value={pass} placeholder="password" onChange={e => setPass(e.target.value)} type="password"></input>
                </div>
                <button onClick={logInHandler} id="loginBtn">login</button>
                <p>Don't have an account? <p onClick={toggle} id="signUp">Sign Up</p></p>
            </div>
            ) : 
            (<Register changeShow={toggle}></Register>)
            }
            </div>
        </div>
    )
}  
type togBtn = {
    changeShow:  () => void
}

function Register({changeShow}:togBtn){
    const[name, setName] = useState("");
    const[userName, setUserName] = useState("");
    const[email, setEmail] = useState("");
    const[pass, setPass] = useState("");
    const reset = () => {
        setName("");
        setUserName("");
        setEmail("");
        setPass("");
    }
    const registerHandler = async() => {//https://gin-production-3fb4.up.railway.app/
        const url = "https://gin-production-3fb4.up.railway.app/v1/user/createUser";
        const regitser = {
            name: name,
            username: userName,
            email: email,
            password: pass
        }
        const res = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(regitser)
        }).then(res => res.json());
        console.log(res);
        reset();
    }

    return (
        <div id="login">
            <h1>Register</h1>
            <div>
                <input value={name} placeholder="name" onChange={e => setName(e.target.value)}></input>
            </div>
            <div>
                <input value={userName} placeholder="username" onChange={e => setUserName(e.target.value)}></input>
            </div>
            <div>
                <input value={email} placeholder="email" onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div>
                <input value={pass} placeholder="password" onChange={e => setPass(e.target.value)} type="password"></input>
            </div>
            <button onClick={registerHandler} id="loginBtn">Register</button>
            <button id="backBtn" onClick={changeShow}>back</button>
        </div>
    )
}
export default LoginPage;
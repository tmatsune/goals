import "./navBar.css";
import { Outlet } from "react-router";
import { Fragment, useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import FooterPage from "../footerpage/footerPage";
import MainTimer from "../../comps/maintimer/mainTimer";
import { profileImgs } from "../../utils/profileImages";
import { useNavigate } from "react-router";
import { ClockContext } from "../../context/clockContext";

function NavBar(){
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {start, jump} = useContext(ClockContext)

    const [color, setColor] = useState<number[]>([30, 144, 255]);//|any rgb(30, 144, 255)
    const [show, setShow] = useState(true);
    
    const [imgType, setImgType] = useState(0)
    const navigate = useNavigate();

    const logout = () => {
        if(currentUser){
            setCurrentUser(null);
        }
    }  
    const dropDown = () => {
        setShow(!show)
    }
    useEffect(() => {
        if(currentUser){
            setColor(currentUser.rgb)
        }
    }, [currentUser])
    useEffect(() => {
        if(jump){
            setImgType(2)
        }
        else if(start){
            setImgType(3)
        }else if(!start){
            setImgType(0)
        }
    }, [start, jump])
    
    const relocate = () => {
        navigate("/profile")
    }
    return (  //onClick={toggleBtn}
        <Fragment>
        <div id="dropBtn" onClick={dropDown} >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
        <header style={{ backgroundColor: `rgb( ${color[0]}, ${color[1]}, ${color[2]} )` }} id={ show ? 'nav' : 'nav1'}>
            <h1 id="">STOIGOAL</h1>
            <ul id="navMenu" >
                {
                    currentUser ? (<MainTimer></MainTimer>) : (null)
                }
                {
                !currentUser ? (
                <ul id="navMenu1" >
                    <Link to="/" id="navMenuA"> <li id="navMenuli">Home</li></Link>
                    <Link to="/login" id="navMenuA"> <li id="navMenuli">Login</li></Link>
                </ul>
                ) : (
                <ul id="navMenu" >
                    <Link to="/progress" id="navMenuA"> <li id="navMenuli">Progress</li> </Link>
                    <Link to="/tracker" id="navMenuA"> <li id="navMenuli">Calendar</li> </Link>
                    <Link to="/studyDocs" id="navMenuA"> <li id="navMenuli">Study</li> </Link>
                    <Link to="/login" id="navMenuA"> <li onClick={logout} id="navMenuli">Logout</li></Link>
                </ul>
                    )
                }
                {  
                    currentUser ? (
                    <div id="sprite1" 
                        onClick={relocate}
                        style={{backgroundImage:`url(${profileImgs[currentUser.Avatar][imgType]})`
                        ,marginLeft: `${0}px`}}>
                    </div>
                    ) : (null)
                }
                
            </ul>
        </header>
        <Outlet></Outlet>
        <Fragment>
            <FooterPage></FooterPage>
        </Fragment>
        </Fragment>
    )
}
export default NavBar
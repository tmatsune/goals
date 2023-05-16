
import "./footerPage.css"
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

function FooterPage(){
    const {currentUser} = useContext(UserContext)
    const [color, setColor] = useState<number[]>([30, 144, 255])

    useEffect(() => {
        if(currentUser){
            setColor(currentUser.rgb)
        }else{
            setColor([30, 144, 255]);
        }
    }, [currentUser])
    return ( //https://cdn-icons-png.flaticon.com/512/1384/1384014.png
        <div id="footerMain" style={{backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`}}>
            <div id="links">
                <Link to="https://www.instagram.com/terencematsune/"><img alt='' src={'https://cdn-icons-png.flaticon.com/512/87/87390.png'}></img></Link>
                <Link to="https://github.com/tmatsune?tab=repositories"><img alt='' src={'https://cdn-icons-png.flaticon.com/512/25/25231.png'}></img></Link>
                <Link to="https://www.linkedin.com/in/terence-matsune-bb4957195/"><img alt='' src={'https://cdn-icons-png.flaticon.com/512/1384/1384014.png'}></img></Link>
            </div>
            <div id="footerDiv">
                <h3>Creater: Terence Matsune</h3>
                <h3>FrontEnd: React</h3>
                <h3>BackEnd: Golang</h3>
            </div>
        </div>
    )
}
export default FooterPage;
import "./homePage.css"
import STUDY from "../../images/study.svg"
import HOME1 from "../../images/home2.webp"
import HOME2 from "../../images/home3.jpeg"
import CAL from "../../images/cal.jpeg"
import COMP from "../../images3/group-of-happy-business-people.svg"
import { profileImgs } from "../../utils/profileImages"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

function HomePage(){//<img alt="" src={BLUE} id="blue"></img>
    const navigate = useNavigate();
    var [dist, setDist] = useState(300);
    const [imgType, setImgType] = useState(3)

    const goToLog = () => {
        navigate('/login')
    }
    const test = () => {
        for(let i = 0; i < 1304; i++){
            setTimeout(() => {
                setDist(dist + i)
            }, 10 * i )
        };
    }
    useEffect(() => {
        test()
    }, [])

    return (
        <div id="homeMain">
            <div id="homeContainer">
                <h1>STOIGOAL</h1>

                <p id="titleP">The best web app for tracking your progress <br></br>and keeping you on track</p>
                <span id="getStarted" onClick={goToLog}>Get Started</span>

                <div style={{backgroundImage:`url(${COMP})`}} id="bgimage"> </div>
            </div>
            <div id="homeContainer2">
                <div id="homeCard">
                    <div id="cardImg1" style={{backgroundImage:`url(${HOME1})`}}></div>
                    <div id="cardStat">
                        <p id="pDesc">Create a account!</p>
                    </div>
                </div>
                <div id="homeCard">
                    <div id="cardImg1" style={{backgroundImage:`url(${CAL})`}}></div>
                    <div id="cardStat">
                        <p id="pDesc">Get Access to your personal calendar and track your streak</p>
                    </div>
                </div>
                <div id="homeCard">   
                    <div id="cardImg1" style={{backgroundImage:`url(${HOME2})`}}></div>
                    <div id="cardStat">
                        <p id="pDesc">Create and add to your notes for future reference</p>
                    </div>
                </div>
            </div>
            <div id="homeContainer3">
                {
                    //<img alt="" id="img3" src={COMP}></img>
                }
 
                <div id="profileImages">
                    {
                        profileImgs.map((_, idx) => {
                            return (
                            <div id="sprite2" 
                            key={idx}
                                style={{backgroundImage:`url(${profileImgs[idx][idx]})`}}>
                            </div>
                            )
                        })
                    }
                </div>
                <div id="custom">
                    <h3 style={{color:"white"}}>Customize</h3>
                    <p>Create your account and personalize <br></br> Choose color themes to cutomize your profile </p>
                </div>
                <div id="curve"></div>
            </div>
            <div id="homeContainer4">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default HomePage
/*
    #homeContainer{
        display: flex;
        margin-top: 10%;
    }

            <div id="homeContainer">
                <div id="homeWrapper">
                    <h1>STOIGOAL</h1>
                    <p id="titleP">The best web app for tracking your progress <br></br>and keeping you on track</p>
                    <span id="getStarted" onClick={goToLog}>Get Started</span>
                </div>            
                <div id="imgWrapper">
                    <img alt="" src={STUDY} id="study"></img>
                </div>
            </div>

        content: '';
        position: absolute;
        height: 560px;
        width: 580px;
        background-color: dodgerblue;
        transform: translate(74.8%, -56%);
        z-index: 2;
        border-radius: 90% 74% 98% 60%;
*/

import "./mainTimer.css"
import { useContext, useEffect, useState } from "react";
import { ClockContext } from "../../context/clockContext";
import { UserContext } from "../../context/userContext";

function MainTimer(){
    const {time, setTime, start, setStart} = useContext(ClockContext);
    const {currentUser} = useContext(UserContext);

    useEffect(() => {
        if(currentUser){
            setTime(currentUser.goaltime * 3600)
        }
    }, [currentUser])

    useEffect(() => {
        const interval = setInterval(() => {
            if(start){
                 setTime(time - 1)
                if(time < 2){
                    setStart(false)
                }
            }
        }, 1000)
        return () => clearInterval(interval); //cleanup
    }, [start, time])

    const startTimer = () => {
        start ? setStart(false) : setStart(true)
    }
    const resetTimer = () => {
        if(currentUser){
            setTime(currentUser.goaltime * 3600)
        }
    }
    return (
        <div id="mainTimer">
            <div id="mainTimerWrapper">
                <div id="t">
                    { Math.floor( (time/60)/60 ) < 10 ? (
                        <h3 id="h">0{ Math.floor( (time/60)/60 ) }:</h3>
                    ) : (
                        <h3 id="h">{ Math.floor( (time/60)/60 ) }:</h3>
                    )  
                    }
                </div>
                <div id="t">
                        { Math.floor( (time/60) % 60 ) < 10 ? (
                            <h3 id="h">0{Math.floor( (time/60) % 60 )}:</h3>
                        ) : (
                            <h3 id="h">{Math.floor( (time/60) % 60 )}:</h3>
                        ) }
                </div>
                <div id="t">
                        { ( time% 3600 ) % 60 < 10 ? (
                            <h3 id="h">0{( time % 3600 ) % 60}</h3>
                        ) : (
                            <h3 id="h">{( time % 3600 ) % 60}</h3>
                        ) } 
                </div>
            </div>
                {
                start ? (<button onClick={startTimer} id="timerBtn" style={{backgroundColor:`rgb(255, 49, 71)`}}>stop</button>) : (
                    <button onClick={startTimer} id="timerBtn" style={{backgroundColor:`rgb(50, 205, 50)`}}>start</button>
                )
                }
                <button onClick={resetTimer} id="timerBtn" style={{backgroundColor:`rgb(255, 255, 255)`, color:"black"}}>reset</button>
        </div>
    )
}
export default MainTimer;
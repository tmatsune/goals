import "./studyPage.css"
import { useEffect, useState, useContext } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router";
import { UserContext } from "../../context/userContext";
import StudyCanvas from "../../comps/studycanvas/studyCanvas";

function StudyPage(){
    const location = useLocation();
    const pathId = location.pathname.split("/")[2]
    const {currentUser} = useContext(UserContext)
    const [show, setShow] = useState(false)

    const [docData, setDocData] = useState('');
    const [loading, setLoading] = useState(false);

    const [time, setTime] = useState<number>(7200)
    const [start, setStart] = useState(false);
    
    const calcTime = (typ:string, timeInp:number) => {
        var hr:number = Math.floor( (time/60)/60 )
        var min:number = Math.floor( (time/60) % 60 )
        var sec:number = ( time% 3600 ) % 60
        switch(typ){
            case "seconds":
                var nwTime = (hr * 3600) + (min * 60) + timeInp
                setTime(nwTime)
                break; 
            case "minutes":
                var nwTime = (hr * 3600) + (timeInp * 60) + sec
                setTime(nwTime)
                break;
            case "hours":
                var nwTime = (timeInp * 3600) + (min * 60) + sec
                setTime(nwTime)
                break;
            default:
                console.log("err")
                setTime(7200);
        }
    }  

    useEffect(() => {
        if(start){
            var interval = setInterval(() => {
                setTime(time - 1)
                if(time <= 1){
                    setStart(false);
                }
            }, 1000)
            return () => clearInterval(interval);
        }
    }, [time, start])

    const getOneDoc = async() => {
        const url = "http://localhost:8080/v1/docs/getOneDoc"
        setLoading(true);
        const res = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                docid: Number(0),
	            userid: Number(currentUser?.id),
	            docname : pathId,
	            docdata : docData
            })
        }).then(res => res.json());
        console.log(res)
        setLoading(false);
        setDocData(res.docdata)
    }
    const saveData = async() => {
        const url = "http://localhost:8080/v1/docs/updateUserDoc"
        if(docData === "" || docData === " "){
            setDocData("example");
        }   
        const res = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "docid": Number(0),
	            "userid": Number(1),
	            "docname" : pathId,
	            "docdata" : docData
            })
        }).then(res => res.json());  
        console.log(res);
    }

    useEffect(() => {
        if(currentUser){
            getOneDoc();
        }
    }, [currentUser])

    const secOptions = Array(60).fill(null).map((_, idx) => {
        return <div key={idx} id="timeOptions" onClick={() => calcTime("seconds", idx)}>{idx}</div>
    })
    const minOptions = Array(60).fill(null).map((_, idx) => {
        return <div key={idx} id="timeOptions" onClick={() => calcTime("minutes", idx)}>{idx}</div>
    })
    const hourOptions = Array(60).fill(null).map((_,idx) => {
        return <div key={idx} id="timeOptions" onClick={() => calcTime("hours", idx)}>{idx}</div>
    })

    return( 
        <div id="studyMain">
        <div id="timerWrapper">
            <div id="timer">
            <div id="test">
                <div id="time">
                    { Math.floor( (time/60)/60 ) < 10 ? (
                        <h1 id="hour">0{ Math.floor( (time/60)/60 ) }:</h1>
                    ) : (
                        <h1 id="hour">{ Math.floor( (time/60)/60 ) }:</h1>
                    )  
                    }
                    <div id="dropdown">
                        <div>{hourOptions}</div>
                    </div>
                </div>
                <div id="time">
                        { Math.floor( (time/60) % 60 ) < 10 ? (
                            <h1 id="hour">0{Math.floor( (time/60) % 60 )}:</h1>
                        ) : (
                            <h1 id="hour">{Math.floor( (time/60) % 60 )}:</h1>
                        ) }
                    <div id="dropdown">
                        <div>{minOptions}</div>
                    </div>
                </div>
                <div id="time">
                        { ( time% 3600 ) % 60 < 10 ? (
                            <h1 id="hour">0{( time% 3600 ) % 60}</h1>
                        ) : (
                            <h1 id="hour">{( time% 3600 ) % 60}</h1>
                        ) } 
                    <div id="dropdown">
                        <div>{secOptions}</div>
                    </div>
                </div>
            </div> 
            </div>
            <div id="btnWrapper">
                <span id="startBtn" onClick={() => setStart(true)} >Start</span>
                <span id="startBtn1" onClick={() => setStart(false)} >Stop</span>
            </div>
            <div id="studyCanvasContainer">
                <span id="breakBtn" onClick={() => {show ? setShow(false) : setShow(true)}} >break</span>
                {
                    show ? (<StudyCanvas></StudyCanvas>) : (null)
                }
            </div>
        </div>
        <div id="quillWrapper">
            {
                loading ? (<p>...loading</p>) : (
                    <div id="quillWrapper2">
                        <span onClick={saveData} id="saveBtn">Save</span>
                        <ReactQuill id="quill" theme="snow" value={docData} onChange={setDocData} />
                    </div>
                )
            }
            
        </div>
        </div>
    )
}
export default StudyPage;
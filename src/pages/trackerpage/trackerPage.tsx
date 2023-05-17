import "./tracker.css";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState, useRef } from "react";
import Month from "../../comps/months/month";
import TRACK from "../../images/track.jpeg"
import SETTINGS from "../../images/settings.svg"
import ITEM from "../../images/tech.jpeg"
import EDIT from "../../images/edit3.jpeg"
import TEST from "../../images3/calendar.svg"

type cal = {
    obj: {
        id:number,
        jan:[],
        feb:[],
        mar:[],
        apl:[],
        may:[],
        jun:[],
        jul:[],
        aug:[],
        sep:[],
        oct:[],
        nov:[],
        dcm:[],
        user_id: number
    }
};

function TrackerPage(){
    const {currentUser} = useContext(UserContext);
    const [calendar, setCalendar] = useState<cal|{}>({});
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState<number[]>([])
    const [insruc, setInstruc] = useState<boolean>(false);
    useEffect(() => {
        if(currentUser){
            if(currentUser.goaltime === 0){
                alert("current goal time is set to 0, go to profile to change your goal")
            }
        }
    }, [currentUser])

    const getTracker = async() => {
        setLoading(true);
        const url = `https://gin-production-3fb4.up.railway.app/v1/goal/getGoalTracker/${currentUser?.id}`;
        const res = await fetch(url, {
            method: "get",
            headers: {
                "Content-Type":"application/json"
            },
        }).then(res => res.json());
        console.log(res);
        setCalendar(res);
        setLoading(false);
    }

    useEffect(() => {
        if(currentUser){
            console.log("getting data")
            getTracker();
        }
        
    }, [currentUser])

    const toggle = () => {
        show ? setShow(false) : setShow(true)
    }
    const toggle2 = () => {
        insruc ? setInstruc(false) : setInstruc(true);
    }

    useEffect(() => {
        var currentdate = new Date();
        const currDay = currentdate.getDate();
        const currMonth = currentdate.getMonth() + 1;
        const currYear = currentdate.getFullYear()
        setDate([currMonth, currDay, currYear])
    }, [])

    const dummyDiv = useRef<HTMLDivElement|null>(null)
    const scrollTop = () => {
        if(dummyDiv){
            dummyDiv.current?.scrollIntoView({behavior:"smooth"})
        }
    }

    return(   //<div id="cardImg" style={{backgroundImage:`url(${EDIT})`}}></div>  //currentUser.Avatar
        <div id="trackerMain">
            <div id="trackerContainer">
                <div id="dummyDiv" ref={dummyDiv}></div>
                <div id="titleWrapper"> 
                    <div id="cardImg" style={{backgroundImage:`url(${EDIT})`}}></div>
                    <div id="cardText">
                        <div>       
                            <p id="goalH1">Goal Time:</p>
                            <h3>{currentUser?.goaltime === 0 ? 4 : currentUser?.goaltime} hours</h3>
                        </div>
                        <div>
                            <img alt="" id="edit" onClick={toggle} src={SETTINGS}></img>
                            {
                            show ? (<EditPopUp></EditPopUp>) : (null)
                            }
                        </div>
                    </div>
                </div>   
                <div id="currDate">
                    <div id="currDateImg" style={{backgroundImage:`url(${ITEM})`}}>
                    </div>
                    <div id="dateDiv">
                        <p>Current Date:</p>
                        <h1>{date[0]}/{date[1]}/{date[2]}</h1>
                    </div>
                </div>
                <div id="currDate">
                    <div id="currDateImg" style={{backgroundImage:`url(${TRACK})`}}>
                    </div>
                    <span id="ins" onClick={toggle2}>Instructions</span>
                    <div id="instrucDiv">
                        <p>Click on a day on calendar and how many hours
                        you studied to track your progress</p>
                    </div>
                </div>
            </div>
            <div id="calendarWrapper">
            {
                loading ? (<p>...loading</p>) : (
                    Object.keys(calendar)
                        .filter(item => typeof calendar[item as keyof typeof calendar] === "object")
                        .map((item,idx) => {
                            //console.log(calendar[item as keyof typeof calendar])
                            var arr = calendar[item as keyof typeof calendar]
                            return <Month title={item} lis={arr} key={idx} intMonth={idx+1}></Month>
                    })
                )
            }
            </div>
            <button onClick={scrollTop} id="scroll">/\</button>
        </div>
    )
}
function EditPopUp(){
    const {changeUserGoal, currentUser} = useContext(UserContext)
    const [nwGoal, setNwGoal]= useState<number>(0)

    const goalHandller = (e:any) => {
        var num = parseInt(e.target.value);
        setNwGoal(num);
    }

    const upDbGoal = async() => {
        const url = "https://gin-production-3fb4.up.railway.app/v1/goal/changeGoal";
        const res = await fetch(url, {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "nwGoal": Number(nwGoal),
                "user_id": Number(currentUser?.id)   
            })
        }).then(res => res.json());
        console.log(res)
    }
    const changeGoal = () => {
        changeUserGoal(nwGoal);
        upDbGoal();
        setNwGoal(0);
    }

    return (
        <div id="editpopup">
            <input onChange={e => goalHandller(e)}></input>
            <button onClick={changeGoal}>submit</button>
        </div>
    )
}
export default TrackerPage;
/*
#cardImg{
    height: 64%;
    background-size: cover;
    border-radius: 9px 9px 0px 0px;
    margin-bottom: -2%;
    background-position: center;
    background-repeat: no-repeat;
}
*/
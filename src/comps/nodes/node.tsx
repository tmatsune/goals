import { useContext, useEffect, useState } from "react";
import "./node.css";
import { GetMonth } from "../../utils/getMonth";
import { UserContext } from "../../context/userContext";

type userGoals = {
    hours: number
    goalTime: number
    currMonth: number
    currDay: number
}

function Node({hours, goalTime, currMonth, currDay}:userGoals){

    const {currentUser} = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [val, setVal] = useState<number>(0);
    const [hour, setHour] = useState(hours)
    const [goal, setGoal] = useState(goalTime)
    const [color, setColor] = useState<number[]|any>([127, 62, 255]);//[120, 40, 245]

    const open = () => {
        if(!show){
            setShow(true);
        }
    }
    const close = () => {
        if(show){
            setShow(false)
        }
    }
    const valHandler = (e:any) => {
        var num = parseInt(e.target.value);
        setVal(num);
    }
    const changeDate = async() => {
        const url = 'http://localhost:8080/v1/goal/hoursStudied';
        var month = GetMonth(currMonth);
        const res = await fetch(url, {
            method:"post", 
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                month: month,
                day: Number(currDay),
                hours: Number(val),
                user_id: currentUser?.id
            })
        }).then(res => res.json())
        setHour(Number(val));
        setVal(0)
    }
    useEffect(() => {
        if(currentUser){
            setColor(currentUser.rgb)
        }
    }, [currentUser])

    return(
        <div onClick={open}>
            {
                hour/goalTime > 0 ? (      
                <div style={{ backgroundColor: `rgba(${color[0]},${color[1]},${color[2]},${hour/goalTime})` }} id="node">
                    <div id="desc">
                        {
                            show ? (
                                <div>
                                    <input id="inp" onChange={e => valHandler(e)}></input>
                                    <span id="close" onClick={close}>X</span>
                                    <span id="sub" onClick={changeDate}>send</span>
                                    </div>
                            ) : (
                                <div><p>Date:{currMonth+ "/"+ currDay}</p><p>hours:{hours}</p></div>
                            )
                        }
                    </div>
                 </div>) : (
                <div style={{backgroundColor: `rgba(40,40,40,.04)`}} id="node">
                    <div id="desc">
                        {
                            show ? (
                                <div>
                                    <input id="inp" onChange={e => valHandler(e)}></input>
                                    <span id="close" onClick={close}>X</span>
                                    <span id="sub" onClick={changeDate}>send</span>
                                    </div>
                            ) : (
                                <div><p>Date:{currMonth+ "/"+ currDay}</p><p>hours:{hours}</p></div>
                            )
                        }
                    </div>
                 </div>
                 )
            }
        </div>
    )
}
export default Node;
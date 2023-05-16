import "./progressPage.css"
import { useState, useEffect, useContext } from "react"
import { ClockContext } from "../../context/clockContext"
import { UserContext } from "../../context/userContext";
import DROP from "../../images/droplet.svg"
import USER from "../../images1/Dude_Monster_Walk_6.png"
import JUMP from "../../images1/Dude_Monster_Run_6.png"
import EDUC from "../../images2/study.svg"
import Habit from "../../comps/habitComp/habit";

type HabitType = {
    id: number;
    habitname: string;
    habitdata: string;
    user_id: number
}
const habitOptions = ["study", "python", "calculus", "science", "biology", "algebra", "geometry", "english", "spanish",
    "anatomy", "javascript", "c++", "art", "literature", "coding", "math", "business", "film"]
function Progress(){
    const {time, start, setJump} = useContext(ClockContext);
    const {currentUser} = useContext(UserContext);

    const [diff, setDiff] = useState(0);
    const [percent, setPercent] = useState<number>(0);

    const [habits, setHabits] = useState<HabitType[]>([]);
    const [loading, setLoading] = useState(false)

    const [habitData, setHabitData] = useState("");
    const [habitName, setHabitName] = useState('');

    useEffect(() => {
        if(currentUser){ //newTime / goalTime
            var num = time / (currentUser.goaltime * 3600);
            var perc = 1 - num;
            setPercent(Math.round(perc * 100));
            var final = Math.round(perc * 300);
            setDiff(final);
        }
    }, [time])
    
    useEffect(() => { //<div id="sprite" style={{backgroundImage:`url(${USER})`}}></div>
        if(start){
            document.documentElement.style.setProperty('--start',`block`);
        }else{
            document.documentElement.style.setProperty('--start',`none`);
        }
    }, [start])

    const getHabits = async() => {
        if(currentUser){
            setLoading(true)
            const url = `http://localhost:8080/v1/habit/getAllHabits/${currentUser.id}`;
            const res = await fetch(url, {
                method: "get",
                headers: {
                    "Content-Type":"application/json",
                }
            }).then(res => res.json())
            console.log(res)
            setLoading(false)
            setHabits(res)
        }
    }
    const createHabit = async() => {
        if(currentUser){
            const reqBody = {
                id: 1,
                habitname: habitName,
                habitdata: habitData,
                user_id: currentUser.id
            }
            const url = "http://localhost:8080/v1/habit/createHabit";
            const res = await fetch(url, {
                method: "post",
                headers: { 
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(reqBody),
            }).then(res => res.json());
            console.log(res)
            var prevData = habits;
            prevData.push(reqBody);
            setHabits(prevData)
        }
        setHabitData('')
        setJump(true)
        setTimeout(() => {
            setJump(false)
        } ,3000)
    }
    useEffect(() => {
        if(currentUser){
            console.log("use effect triggered")
            getHabits(); 
        }
    }, [currentUser])

    const deleteHabit = (habitData:string) => {
        const nwHabits = habits.filter(item => {
            return item.habitdata !== habitData
        })
        setHabits(nwHabits)
        setJump(true)
        setTimeout(() => {
            setJump(false)
        } ,3000)
    }

    return (
        <div id="progMain">
            
            <div id="habitWrapper">
                <div id="habits">
                    {
                        loading ? (<p>...loading</p>) : (
                            habits.map((item, idx) => {
                                return (//<Habit obj={item} key={idx}></Habit>
                                    <Habit obj={item} key={idx} deleteHabit={deleteHabit}></Habit>
                                )
                            })
                        )
                    }
                </div>
                <div id="createHabit">
                    <div id="createImg" style={{backgroundImage: `url(${EDUC})`}}>
                    </div>
                    <div id="createDesc">
                        <h2>Create new Habit</h2>
                        <select name="allhabits" value={habitName} onChange={(e) => setHabitName(e.target.value)}>
                        {
                            habitOptions.map((item, idx) => {
                                return (
                                <option key={idx} id="opt" >
                                    {item}
                                </option>)
                            })
                        }
                        </select>
                        <div>
                            <textarea value={habitData} onChange={e => setHabitData(e.target.value)} id="txt"></textarea>
                        </div>
                        <button onClick={createHabit} id="submitHab">Submit</button>
                    </div>
                </div>
            </div>

                <div id="progWrapper">
                    <img id="drop" alt='' src={DROP}></img>
                    <h2 id="perc">{percent}%</h2>
                    <div id="progContainer" style={ {height: 300} } >
                    <div id="progContainer2" style={ {marginTop: -136 - diff} }></div>
                    </div>
                    <h4>Daily Progress</h4>
                </div>

        </div>
    )
}

export default Progress
import "./profilePage.css"
import { useContext, useEffect, useState} from "react";
import { UserContext } from "../../context/userContext";
import { profileImgs, mainProfImgs } from "../../utils/profileImages";
import { ClockContext } from "../../context/clockContext";
import ProfHabit from "../../comps/profhabit/profHabit";
const colors = [
    [0, 255, 127], [255,140,0], [220,20,60], [255,0,255], [255,255,0], [120, 40, 245],
    [0, 255, 255],[255, 215, 0], [238, 130, 238], [106, 90, 205]
]
type HabitType = {
    id: number;
    habitname: string;
    habitdata: string;
    user_id: number
}

function ProfilePage(){//<div id="sprite" style={{backgroundImage:`url(${USER})`}}></div>

    const {currentUser, changeUserAvatar, changeUserRgb, changeUserGoal} = useContext(UserContext)
    const {time, start, setTime} = useContext(ClockContext)

    const [userImg, setUserImg] = useState<number>(0)
    const [imgType, setImgType] = useState(0)

    const [dist, setDist] = useState(40)
    const [habits, setHabits] = useState<HabitType[]>([])
    const [nwGoal, setNwGoal] = useState<number>(0)

    const changeTheme = async(nwColor:number[]) => {
        if(currentUser){
            const url = 'https://gin-production-3fb4.up.railway.app/v1/v1/user/updateRgb';
            const reqBody = {
                rcolors: Number(currentUser.rgb),
                user_id: Number(nwColor)
            }
            const res = await fetch(url, {
                method: "post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(reqBody)
            }).then(res => res.json())
            console.log(res);
            changeUserRgb(nwColor[0], nwColor[1], nwColor[2])
        }
    }

    useEffect(() => {
        if(currentUser){
            try{
                setUserImg(currentUser.Avatar)
            }catch(err){
                alert("error")
                setUserImg(0)
            }
        }
    }, [currentUser])

    useEffect(() => {
         if(currentUser){ //newTime / goalTime
            var num = time / (currentUser.goaltime * 3600);
            var perc = 1 - num;
            setDist(Math.round(perc * 100));
            if(time < 10){
                setImgType(2)
            }
        }
    }, [time])
    useEffect(() => {
        if(start){
            setImgType(3)
        }else if(!start){
            setImgType(0)
        }
    }, [start])

    const test = () => {
        for(let i = 0; i < 204; i++){
            setTimeout(() => {
                setDist(dist + i)
            }, 10 * i )
        }
    }
    const changeDbAvatar = async(num:number) => {
        if(currentUser){
            const url = "https://gin-production-3fb4.up.railway.app/v1/user/updateAvatar"
            const reqBody = {
                avatar: Number(num),
                email: currentUser.email
            }
            const res = await fetch(url, {
                method: "post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(reqBody)
            }).then(res => res.json())
            console.log(res)
            changeUserAvatar(num)
        }
    }
    const getHabits = async() => {
        console.log("re render")
        if(currentUser){
            const url = `https://gin-production-3fb4.up.railway.app/v1/habit/getAllHabits/${currentUser.id}`;
            const res = await fetch(url, {
                method: "get",
                headers: {
                    "Content-Type":"application/json",
                }
            }).then(res => res.json())
            console.log(res)
            setHabits(res)
        }
    }
    useEffect(() => {
        if(currentUser){
            getHabits();
        }
    }, [currentUser])

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

    return(//<div></div>  <h5>{currentUser.username}</h5>
        <div id="profileMain">
            {
            currentUser ? (
                <div id="profileDetails">
                    <div id="profCard">
                        <div id="spriteWrapper">
                            <div id="sprite" style={{backgroundImage:`url(${profileImgs[userImg][imgType]})`,marginLeft: `${10}px`}}>
                            </div>
                        </div>
                        <hr></hr>
                        <div id="currUser">
                            <div id="currUserDiv">
                                <p>Username:</p>
                                <h5>{currentUser.username}</h5>
                            </div>
                            <div id="currUserDiv">
                                <p>Email:</p>
                                <h5>{currentUser.email}</h5>
                            </div>
                            <div id="currUserDiv">
                                <p>Name:</p>
                                <h5>{currentUser.name}</h5>
                            </div>
                            <div id="currUserDiv">
                                <p>Profile Image:</p>
                                <div id="allProfs">
                                    {
                                    mainProfImgs.map((item, idx) => {
                                        return (
                                        <img key={idx} id="imgSel" src={item} alt=""
                                           style={{borderColor:idx === currentUser.Avatar ? 'red' : 'black'}}
                                           onClick={() => changeDbAvatar(idx)}>
                                        </img>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div id="profCard1">
                        <div id="profCardProp0">
                            {
                                habits.map((item, idx) => {
                                    return(
                                        <ProfHabit key={idx} obj={item}></ProfHabit>
                                    )
                                })
                            }
                        </div>
                        <div id="profCardProp" style={{marginTop: '4.6%'}}>
                            <div id="changeCol">
                                <h2>Change Theme</h2>
                                <hr></hr>
                                <div id="lisColors">
                                {
                                    colors.map((item, idx) => {
                                        return(
                                            <div onClick={() => changeTheme(item)} 
                                                style={{backgroundColor: `rgb(${item[0]},${item[1]},${item[2]})`}}
                                                key={idx} 
                                                id="colNode">
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                            <div id="changeTime">
                                <h2>Change Goal Time</h2>
                                <hr></hr>
                                <h4>Enter New Goal</h4>
                                    <input value={nwGoal} onChange={e => setNwGoal(Number(e.target.value))} id="timeInp"></input>
                                    <button id="submitHab" onClick={changeGoal} style={{marginLeft: '4px'}}>Change</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (null)
            }
        </div>
    )
}
/*
    <div id="sprite" 
        style={{backgroundImage:`url(${profileImgs[userImg][imgType]})`
        ,marginLeft: `${dist}px`}}>
    </div>
*/
export default ProfilePage;
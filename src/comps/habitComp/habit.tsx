
import "./habit.css"

import IMG from "../../images2/laptop.svg"
import IMG1 from "../../images2/math.svg"
import IMG2 from "../../images2/science.svg"
import IMG3 from "../../images2/book.svg"
import IMG4 from "../../images2/art-board.svg"
import IMG5 from "../../images2/book1.svg"
import { useState, useContext } from "react"
import { UserContext } from "../../context/userContext"

type habit = {
    obj: {
        id: number;
        habitname: string;
        habitdata: string;
        user_id: number
    },
    deleteHabit: (habitData: string) => void
}
type UpdateHabits = {
    deleteHabit: (habitData: string) => void
}

const studyImgs = [IMG, IMG1, IMG2, IMG3, IMG4, IMG5];
const studyColors = ['rgb(115, 206, 250)', 'rgb(100,149,237)', 'rgb(144, 238, 144)', 'rgb(221, 160, 221)',
 'rgb(255, 99, 71)', 'rgb(255, 165, 0)']   //rgb(255, 255, 110)

function Habit({obj, deleteHabit}:habit){
    const {habitname, habitdata} = obj
    const {currentUser} = useContext(UserContext)

    const imgNum:number = retItem(habitname);
    const [show, setShow] = useState(false);

    const toggle = () => {
        show ? setShow(false) : setShow(true)
    }
    const del = async(habitData:string) => {
        if(currentUser){
            const delBody = {habitdata: habitData, user_id: currentUser.id}
            const url = "http://localhost:8080/v1/habit/deleteHabit";
            const res = await fetch(url, {
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(delBody),
            }).then(res => res.json());
            console.log(res);
            deleteHabit(habitData)
        }
    }
    return (    //style={{backgroundImage: `url(${studyImgs[imgNum]})`}}
        <div id="habitCard" style={{backgroundColor:studyColors[imgNum]}}>
            {
                show ? (
                    <div>
                        <div id="habitName">
                            <h3 onClick={toggle}>{habitname}</h3>
                        </div>
                        <div id="habitDetails">
                            <p>{habitdata}</p>
                            <button id="delBtn" onClick={() => del(habitdata)}>X</button>
                        </div>
                    </div>
                ) : (
                <div id="habitImgWrapper" >
                    <div id="habitName">
                        <h3 onClick={toggle}>{habitname}</h3>
                    </div>
                    <img alt='' id="habImg" src={studyImgs[imgNum]}></img>
                </div>
                )
            }

        </div>
    )
}
const retItem = (name:string):number => {
    if(name === "coding" || name === "python" || name === "javascript" || name === "c++"){
        return 0;
    }
    if(name === "calculus" || name === "geometry"  || name === "algebra" || name === "math"){
        return 1;
    }
    if(name === "science"|| name ===  "biology" || name === "anatomy" ){
        return 2;
    }
    if(name === "english"|| name ===  "literature" || name === "spanish" ){
        return 3;
    }
    if(name === "art" || name ===  "film"){
        return 4;
    }
    if(name === 'business'){
        return 5;
    }
    return 5;
}
export default Habit;
/*
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px 0px 0px 10px;
    background-color: rgb(238, 238, 238);
*/

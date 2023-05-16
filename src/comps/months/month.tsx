import "./month.css";
import Node from "../nodes/node";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";

type monthInfo = {
        lis: []
        title: string
        intMonth: number
}

function Month({ lis, title, intMonth }:monthInfo ){
    const {currentUser} =  useContext(UserContext);
    const [num , setNum] = useState(0);
    useEffect(() => {
        if(currentUser){
            setNum(currentUser.goaltime)
        }
    }, [currentUser])
    
    return(
        <div>
        
        <h5 id="monthTitle">{title}</h5>
        <div id="month">
            {
                lis.map((item, idx) => {//idx = day
                    return <Node 
                        hours={item} 
                        key={idx} goalTime={num} 
                        currDay={idx+1}
                        currMonth={intMonth}></Node>
                })
            }
        </div>
        </div>
    )
}
export default Month;
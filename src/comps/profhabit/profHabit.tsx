import "./profHabit.css";
import IMG from "../../images2/laptop.svg"
import IMG1 from "../../images2/math.svg"
import IMG2 from "../../images2/science.svg"
import IMG3 from "../../images2/book.svg"
import IMG4 from "../../images2/art-board.svg"
import IMG5 from "../../images2/book1.svg"
import { useState } from "react";

type habit = {
    obj: {
        id: number;
        habitname: string;
        habitdata: string;
        user_id: number
    },

}
const studyImgs = [IMG, IMG1, IMG2, IMG3, IMG4, IMG5];
const studyColors = ['rgb(115, 206, 250)', 'rgb(100,149,237)', 'rgb(144, 238, 144)', 'rgb(221, 160, 221)',
 'rgb(255, 99, 71)', 'rgb(255, 165, 0)']

function ProfHabit({obj}:habit){
    const {habitname, habitdata} = obj
    const imgNum:number = retItem(habitname);
    const [show, setShow] = useState(false)

    const toggle = () => {
        show ? setShow(false) : setShow(true)
    }

    return(
        <div id="habitCard1" style={{backgroundColor:studyColors[imgNum]}}>
            {
                show ? (
                    <div>
                        <div id="habitName">
                            <h3 onClick={toggle}>{habitname}</h3>
                        </div>
                        <div id="habitDetails">
                            <p>{habitdata}</p>
                        </div>
                    </div>
                ) : (
                <div id="habitImgWrapper">
                    <div id="habitName1">
                        <h3 onClick={toggle}>{habitname}</h3>
                    </div>
                    <img alt='' id="habImg1" src={studyImgs[imgNum]}></img>
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
export default ProfHabit
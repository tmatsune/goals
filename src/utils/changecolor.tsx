export const get = () => {

}
    /*
    const changeColor = async(r:number, g:number, b:number) => {
        const url = "http://localhost:8080/v1/user/updateRgb";
        const rgbs = [r, g, b]
        const res = await fetch(url, {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({//rgbs.map(Number)
                rcolors:[Number(r), Number(g), Number(b)],
                user_id: Number(currentUser?.id)  
            })
            
        }).then(res => res.json());
        console.log(res);
        changeUserRgb(r, g, b)
    }
    */
/*
PORGRESS BAR
    <div id="spriteWrapper1">
        <div id="sprite" 
            style={{backgroundImage:`url(${profileImgs[userImg][imgType]})`
            ,marginLeft: `${dist}%`, marginTop: '80px'
            }}>
            <p id="distPerc">{dist}%</p>
         </div>
    </div>
    <div>
    <div id="progBar">
        <div id="progBar1" style={{width: `${dist}%`}}></div>
     </div>
    </div>

#spriteWrapper1{
    box-sizing: border-box;
    height: 90%;
    border-width: 1px;
}
#line{
    margin-top: -160px;
}
#distPerc{
    position: relative;
    bottom: 26%;
    left: 30%;
    font-size: .48rem;
}
#progBar{
    width: 100%;
    height: 20px;
    border-style: solid;
    border-radius: 20px;
    margin-top: -180px;
}
#progBar1 {
    height: 19.96px;
    border-radius: 20px;
    background-color: rgb(182, 65, 255);
}
*/


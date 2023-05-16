import "./studyCanvas.css"
import { useEffect, useRef, useState } from "react";
import BG from "../../images/dinobg.jpeg"
import CAT from "../../images/Walk.png"

function StudyCanvas(){
    const [start, setStart] = useState(false);

    type InputHandler = {
        keys : string[]
    }
    var userInputs:InputHandler = {
        keys: []
    };

    window.addEventListener('keydown' , e => {
        if( (e.key === "s" 
            || e.key === "w"
            || e.key === "a"
            || e.key === "d")
            && userInputs.keys.indexOf(e.key) === -1 // if indexOf(e.key) === -1, e.key wasnt in array 
        ){
            userInputs.keys.push(e.key)
        }
    })
    window.addEventListener('keyup', e => {
        if( e.key === "s" 
            || e.key === "w"
            || e.key === "a"
            || e.key === "d"
        ){
            //console.log(userInputs.keys)
            userInputs.keys.splice(userInputs.keys.indexOf(e.key), 1)    
        }
    })
    type Player = {
        x: number
        y: number
        width: number
        height: number
        jumpSpeed: number
    }
    type BackGround = {
        x: number
        y: number
        width: number
        height: number
    }
    type Enemy = {
        x: number
        y: number
        width: number
        height: number
        speed: number
    }
    
    const drawItem = ( canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D, user:Player):void => {
        ctx.beginPath();        
        ctx.fillStyle = "black";
        ctx.fillRect(user.x, user.y, user.width, user.height);
        ctx.stroke();
    }
    const moveItem = (user:Player, inputs:InputHandler):void => {
        if(inputs.keys.indexOf("d") > -1){
            user.x += 2
        }
        if(inputs.keys.indexOf("a") > -1){
            user.x -= 2
        }
        if(inputs.keys.indexOf("w") > -1 && onGround(user)){
            user.jumpSpeed -= 14
        }
        if(inputs.keys.indexOf("ArrowDown") > -1){
            user.y += 2
        }        

    }
    const checkItem = (user:Player, canvas:HTMLCanvasElement):void => {
        if(user.x > canvas.width - 42){
            user.x = canvas.width - 42;
        }
        if(user.x < 2){
            user.x = 2
        }
        if(user.y > canvas.height - 62){
            user.y = canvas.height - 62
        }
        if(user.y < 2){
            user.y = 2
        }
    }
    const gravity = 1
    const applyGravity = (user:Player, canvas:HTMLCanvasElement) => {
        user.y += user.jumpSpeed
        if(!onGround(user)){
            user.jumpSpeed += gravity
        }else{
            user.jumpSpeed = 0
        }
    }

    const onGround = (user: Player):boolean => {
        if(user.y >= 200 - 62){
            return true
        }
        return false
    }
    const user:Player = {
        x: 4,
        y: -0,
        width: 20,
        height: 20, 
        jumpSpeed: 0,
    }

    const background:BackGround = {
        x: 0,
        y: 0,
        width: 200,
        height: 10
    }
    const moveBg = (bg:BackGround) => {
        bg.x -= 1.8
        if(bg.x < -500){
            bg.x = 0;
        }
    }
    var bg = new Image();
    bg.src = BG
    function drawBg(bg: HTMLImageElement, canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D){
        ctx.drawImage(bg, background.x, background.y, canvas.width+background.width, canvas.height);
        ctx.drawImage(bg, background.x + 498, background.y, canvas.width+background.width, canvas.height);
    }
    var enemies:Enemy[] = []
    for(let i = 1; i < 5; i++){
        var enemy:Enemy = {
            x: 180 + (i * 200), y: 140, width:20, height:20, speed:2
        }
        enemies.push(enemy);
    }

    const drawEnemies = (enemies: Enemy[], ctx: CanvasRenderingContext2D) => {
        enemies.forEach(enemy => {
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
            ctx.stroke();
        })
    }

    const moveEnemies = (enemies: Enemy[]) => {
        enemies.forEach((enemy) => {
            enemy.x -= enemy.speed
        })
    }

    const replaceEnemy = (enemies: Enemy[]) => {
        for(let i = 1; i < enemies.length; i++){
            if(enemies[i].x < 0){
                enemies[i].x = 180 + (i * 240)
            }
        }
    }

    const hitDetection = (enemies: Enemy[], user:Player):void => {
        for(let i = 0; i < enemies.length; i++ ){
            let dx = enemies[i].x - user.x
            let dy = enemies[i].y - user.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            if(distance < user.height){
                reset(user, background, enemies)
            }
        }
    }

    var reqId:number;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const reset = (user:Player, background:BackGround, enemies: Enemy[]) => {
        user.x = 10;
        user.y = 0
        background.x = 0
        for(let i = 0; i < 4; i++){
            enemies[i].x = 180 + (i * 200)
            enemies[i].y = 138
        }
    }
    const drawBorders = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.strokeRect(2, 2, canvas.width-4, canvas.height-4);
        ctx.stroke();
    }


    useEffect(() => {
    //window.addEventListener("load", e => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if(canvas && ctx){
            const draw = () => {
                ctx.clearRect(0, 30, canvas.width, canvas.height);
                drawBg(bg, canvas, ctx);
                drawBorders(ctx, canvas)
                if(start){
                    moveBg(background)
                    drawItem(canvas, ctx, user);
                    moveItem(user, userInputs);
                    applyGravity(user, canvas)
                    checkItem(user, canvas);
                    drawEnemies(enemies, ctx);
                    moveEnemies(enemies)
                    replaceEnemy(enemies)
                    hitDetection(enemies, user);
                }
                reqId = requestAnimationFrame(draw);
            }
            requestAnimationFrame(draw);
        }
    }, [start])
        //})
    const startGame = () => {
        setStart(true);
        reset(user, background, enemies)
    }
    return(
        <div id="studyCanvas">
            <canvas ref={canvasRef} width={340} height={220}></canvas>
            <div id="btns">
                <span onClick={startGame} id="start" style={{backgroundColor:`rgba(50,205,50)`}}>Start</span>
                <span onClick={() => setStart(false)} style={{backgroundColor:`rgba(255,49,71)`}} id="start">Reset</span>
            </div>
        </div>
    )
}
export default StudyCanvas;
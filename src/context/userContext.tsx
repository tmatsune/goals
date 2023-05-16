import { createContext, useState, useEffect } from "react";
import React from "react";

type AuthUser = {
    id:number;
    name:string;
    username:string;
    email:string;
    password:string;
    goaltime: number;
    rgb:number [];
    Avatar: number;
}
type currentUserType = {
    currentUser: AuthUser | null,
    setCurrentUser: React.Dispatch<React.SetStateAction<AuthUser | null>>,
    changeUserGoal: (num: number) => void,
    changeUserRgb: (r: number, g: number, b: number) => void,
    changeUserAvatar: (num: number) => void
}
type ReactProps = {
    children: React.ReactNode;
}
const changeGoal = (nwGoalTime:number, currUser:AuthUser) => {
    return {...currUser, goaltime: nwGoalTime }
}
const changeRgb = (r:number, g:number, b:number, currUser:AuthUser) => {
    return {...currUser, rgb:[r, g, b]} ;
}

const changeAvatar = (num:number, currUser:AuthUser) => {
    return {...currUser, Avatar: num}
}

export const UserContext = createContext({} as currentUserType);

export const UserProvider = ({children}:ReactProps) => {
    const [currentUser, setCurrentUser] = useState<AuthUser|null>(null);

    useEffect(() => {
        const user = localStorage.getItem("currUser");
        if(user !== null){
            setCurrentUser(JSON.parse(user));
        }
    }, [])  
    useEffect(() => {
        localStorage.setItem("currUser", JSON.stringify(currentUser));
    }, )

    const changeUserGoal = (num:number) => {
        if(currentUser){
            setCurrentUser(changeGoal(num, currentUser))
        }
    }
    const changeUserRgb = (r:number, g:number, b:number) => {
        if(currentUser){
            setCurrentUser(changeRgb(r, g, b, currentUser))
        }
    }

    const changeUserAvatar = (num:number) => {
        if(currentUser){
            setCurrentUser(changeAvatar(num, currentUser))
        }
    }


    return <UserContext.Provider value={{currentUser, setCurrentUser, changeUserGoal, changeUserRgb, changeUserAvatar}}>
        {children}
        </UserContext.Provider>
}

import { createContext, useState, useEffect } from "react";
import React from "react";

type ReactProps = {
    children: React.ReactNode;
}
type ClockCtxType = {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    start: boolean;
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
    jump: boolean;
    setJump: React.Dispatch<React.SetStateAction<boolean>>
}

export const ClockContext = createContext({} as ClockCtxType)

export const ClockProvider = ({children}:ReactProps) => {
    const [time, setTime] = useState(200);
    const [start, setStart] = useState(false);
    const [jump, setJump] = useState(false)

    useEffect(() => {
        var data = localStorage.getItem("time");
        if(data !== undefined && data !== null){
            setTime(JSON.parse(data));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("time", JSON.stringify(time))
    }, )


    const value = {time, setTime, start, setStart, jump, setJump};

    return <ClockContext.Provider value={value}>{children}</ClockContext.Provider>
}
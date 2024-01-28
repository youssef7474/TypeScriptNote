import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string,instialValue:T | (()=>T)){
    const [value,Setvalue]=useState<T>(()=>{
        const jsonValue=localStorage.getItem(key)
        if(jsonValue==null){
            if(typeof instialValue === "function"){
                return(instialValue as ()=>T)()
            }else{
                return instialValue
            }
        }else{
            return JSON.parse(jsonValue)
        }
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[value,key])

    return [value,Setvalue] as [T,typeof Setvalue]
}
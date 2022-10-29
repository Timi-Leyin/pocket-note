import { MutableRefObject } from "react"
// import jwt from "jsonwebtoken"
export const save = (html:string)=>{

}


// draft - offline
export const saveDraft = (ref:MutableRefObject<HTMLDivElement>)=>{
    if(ref.current){
        // remove script tag
    const token =btoa(ref.current.innerHTML)
        console.log(token)
        return 
    }
}

import {supabase} from "@/supabase/index"
import type { SaveProps } from "../interfaces"
// import jwt from "jsonwebtoken"
export const save = (html:string)=>{

}


// draft - offline
export const saveDraft = async({title,type="html",ref,user_id}:SaveProps)=>{
    if(ref.current){
        // remove script tag
        const html =btoa(ref.current.innerHTML);

        await supabase.from("notes").insert([{
            title,
            type,
            note:html,
            user_id
        }])
        return 
    }
}
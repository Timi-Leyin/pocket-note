
import {supabase} from "@/supabase/index"
// import { Html3 } from "iconsax-react";
import type { SaveProps } from "../interfaces"
// import jwt from "jsonwebtoken"
export const save = async({title,type="html",ref,user_id,uuid, action, shared}:SaveProps)=>{
  if(ref.current){
    // remove script tag
    const html =btoa(ref.current.innerHTML);
    console.log(action, uuid)
    if(action === "edit"){
     const res = await supabase.from("notes").update({
        title,
        note:html,
        shared
       }).eq("uuid",uuid)
       console.log(res)
       return [res.error,res.data] 
    }else{
      const response = await supabase.from("notes").insert([{
        title,
        type,
        note:html,
        user_id,
        shared,
        uuid
    }])
    return [response.error,response.data] 
    }
}
}


// draft - offline
export const saveDraft = async({title,type="html",ref, uuid}:SaveProps)=>{
    if(ref.current){
        // remove script tag
        const html =btoa(ref.current.innerHTML);
        localStorage.setItem(uuid,JSON.stringify({
          title,
          type,
          note:html
        }))
    }
}
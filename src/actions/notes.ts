import { supabase } from "../supabase";
import { currentUser } from "./user";

export const getMyNotes = async ():Promise<[any, any[]]> =>{
    const current = await currentUser()
    // fix: null readings
    let { data: notes, error } = await supabase.from("notes").select("*").eq("user_id", current[1] && current[1].id || "")
    
    return [error, notes as any[]]
}



export const getSharedNotes = async ():Promise<[any, any[]]> =>{
    const current = await currentUser()
    // fix: null readings
let { data: notes, error } =  await supabase.from("notes").select("*").contains("shared", current[1] && [current[1].email] || "")

    return [error, notes as any[]]
}


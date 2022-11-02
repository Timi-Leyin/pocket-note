import { supabase } from "../supabase";

export const getMyNotes = async ():Promise<[any, any[]]> =>{
    let { data: notes, error } = await supabase.from("notes").select("*").eq("user_id",atob(localStorage.getItem("sid") as string))

    return [error, notes as any[]]
}
import { supabase } from "../supabase";

export const getMyNotes = async ():Promise<[any, any[]]> =>{
    let { data: notes, error } = await supabase.from("notes").select("*");

    return [error, notes as any[]]
}
import { supabase } from "@/supabase/index";

export const currentUser = async ():Promise<[any, any]> =>{
    let { data: user, error } = await  supabase.auth.getUser();
 user.user &&  localStorage.setItem("sid", btoa(user.user.id))
    return [error, user.user?.user_metadata]
}
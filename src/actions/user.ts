import { supabase } from "@/supabase/index";
import { User } from "@supabase/supabase-js";

export const currentUser = async ():Promise<[any, User]> =>{
    let { data: user, error } = await  supabase.auth.getUser();
    return [error, user.user as User]
}
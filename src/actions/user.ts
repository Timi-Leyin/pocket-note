import { supabase } from "@/supabase/index";

export const currentUser = async ():Promise<[any, any]> =>{
    let { data: user, error } = await  supabase.auth.getUser();

    return [error, user.user?.user_metadata]
}
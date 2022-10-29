import { supabase } from "@/supabase/index";

export const signin = async ()=>{
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
        });
        console.log(data, error);
}

export const logout = ()=>{
    
}
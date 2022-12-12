import { supabase } from "@/supabase/index";

export const signin = async ()=>{
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
        });
        // console.log(data, error);
}

export const logout = async()=>{
  const { error } = await supabase.auth.signOut()
  if(!error) window.location.assign("/")
}
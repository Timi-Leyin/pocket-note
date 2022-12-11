import { Edit, Eye, Trash } from "iconsax-react";
import { NoteProps } from "@/interfaces/index";
import { date } from "@/utils/index";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { currentUser } from "@/actions/user";
import { useState } from "react";
import Loading from "./Loading";

const current = await currentUser()
const Note = ({ data }:{data:NoteProps}) => {
  const [isLoading, setIsLoading] = useState(false)
  // console.log(data)
  const element= document.createElement("p")
    element.innerHTML=atob(data.note)
  return (
    <button className="note outline-none relative max-w-[300px] w-full h-[300px] text-left p-1 rounded-lg bg-gradient-accent text-black">
      <div className="bg-pink-500 p-5 h-full rounded-[inherit] flex flex-col justify-between ">
        <div className="content-highlight font-bold pt-2 text-xl">
          <span>{element.textContent}</span>
          {/* {` The beginning of screenless design:
        UI jobs to be taken
        over by solution Architect.`} */}
        </div>

        <div className="meta-data py-0 flex justify-between items-center">
          <p className="date">
            <span>{date(data.created_at)}</span>
            {/* October 16, 2022 */}
          </p>
      <Link to={`/notes/${data.title}=${data.uuid}=id=${data.id}`}>
          <div className="w-[30px] mx-2 gap-2 flex-center text-black cursor-pointer  h-[30px] rounded-full bg-white">
            {current[1] && current[1].id == data.user_id ? <Edit size="13px" /> : <Eye size="13px"/>}
          </div>
          </Link>
          {
            (current[1] && current[1].id ) == data.user_id && (
              <div className="w-[30px] mx-2 flex-center text-black cursor-pointer  h-[30px] rounded-full bg-red-500" onClick={async()=>{
                setIsLoading(true)
                const response = await supabase.from("notes").delete().eq("uuid",data.uuid)
                // console.log(response)
            if(!response.error) window.location.reload()
             }}>
              {isLoading ? <Loading /> : <Trash size="13px" />} 
             </div>
            )
          }
         
        </div>
      </div>
    </button>
  );
};
export default Note;

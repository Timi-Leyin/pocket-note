import { Edit, Eye, Trash } from "iconsax-react";
import { NoteProps } from "@/interfaces/index";
import { date } from "@/utils/index";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { currentUser } from "@/actions/user";
import { useState } from "react";
import Loading from "./Loading";
import useLoader from "@/hooks/useLoader";
import { decrypt } from "@/utils/hash";

const Note = ({ data }:{data:NoteProps}) => {
   const user = useLoader(currentUser());
  const current = user.data;
  const loading = user.loading

  const [isLoading, setIsLoading] = useState(false)
  // console.log(data)
  const element= document.createElement("p")
    element.innerHTML=decrypt(data.note)
  return (
    <button className="note outline-none relative w-full w-full h-[300px] text-left p-1 rounded-lg bg-gradient-accent text-black">
      <div className="bg-pink-500 p-5 h-full rounded-[inherit] flex flex-col justify-between ">
        <div className="content-highlight font-bold pt-2 text-xl">
          <p className="block" style={{overflowWrap:"anywhere"}}>{`${element.textContent?.slice(0,150).trim()} ${(element?.textContent && element?.textContent.length >= 150 )? "...":""}`}</p>
          {/* {` The beginning of screenless design:
        UI jobs to be taken
        over by solution Architect.`} */}
        </div>

        <div className="meta-data py-0 flex justify-between items-center">
          <p className="date">
            <span>{date(data.created_at)}</span>
            {/* October 16, 2022 */}
          </p>
    <div className="flex items-center gap-3">
    <Link to={`/notes/${data.title}=${data.uuid}=id=${data.id}`}>
          <div className="w-[50px] mx-2 gap-2 flex-center text-black cursor-pointer  h-[50px] rounded-full bg-white">
            {loading ? <Loading />: current.id === data.user_id ? <Edit size="18px" />: <Eye size="18px"/>}
            {/* {current && current.id == data.user_id ? <Edit size="18px" /> : <Eye size="18px"/>} */}
          </div>
          </Link>
          {
           loading? <Loading />: (current && current.id ) == data.user_id ? (
              <div className="w-[50px] mx-2 flex-center text-black cursor-pointer  h-[50px] rounded-full bg-red-500" onClick={async()=>{
                setIsLoading(true)
                const response = await supabase.from("notes").delete().eq("uuid",data.uuid)
                // console.log(response)
            if(!response.error) window.location.reload()
             }}>
              {isLoading ? <Loading /> : <Trash size="18px" />} 
             </div>
            ): null
          }
         
    </div>
        </div>
      </div>
    </button>
  );
};
export default Note;

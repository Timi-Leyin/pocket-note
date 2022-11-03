import {saveDraft, save} from "@/actions/save"
import { useEffect, useRef, useState} from "react"
import Header from "./Header";
import Tools from "./Tools";
import * as uuid from "uuid"
import { useParams } from "react-router-dom";
import { currentUser } from "@/actions/user";

// ---------------------------
const _id=uuid.v1()
const current = await currentUser()
// ---------------------------

const Editor = () => {
  const {id} = useParams();
  
  let mock_title=""
  const [title, setTitle] = useState("Untitled")
  const note_editor = useRef<HTMLDivElement>(null!)
  const [last_updated, setlastUpdated]= useState(new Date().toLocaleTimeString())
  const [action,setAction]= useState<"read"|"new">("new")
  const param_arr = id?.split("=")

  const onSaveDraft=()=>{

    return saveDraft({
      uuid:_id,
      title,
      ref:note_editor,
    })
  }

  const onSave = () :any =>{
   return save({
      title,
      ref:note_editor,
      uuid:_id,
      user_id:current[1].id || ""
      // user_id:"c599e74e-40ce-41f5-9b0f-ce88e41430b6"
    })
  }

  useEffect(()=>{
    // console.clear()
    if(param_arr && param_arr[0]==="new" && !param_arr[3]) setAction("new") 
    if(param_arr && param_arr[3]) setAction("read") 
    // 0 = title
    // 1 =uuid
    // 2 = "id"
    // 3 = id -> value
    console.log(_id)
    console.log(param_arr)
    console.log(action)
    // onSaveDraft()
  // //  delay
  // setTimeout(()=> navigate("/notes/"+title+"="+_id+"=id=12") ,2000)
  },[])

  // save draft
  return (
    <div className="">
      
      <div className="bg-gray-900 px-8">
        <Header title={action == "read"?(param_arr && param_arr[0]):title} onTitleChange={(e)=> setTitle(e.target.value) } />
      </div>
      <Tools onSave={onSave} updated={last_updated}/>
      <div className="editor-wrapper">
        <div className="text-editor px-12 py-6">
          <span ref={note_editor} contentEditable="true"></span>
        </div>
      </div>
      <div className="editor-footer"></div>
          
    </div>
  );
};
export default Editor;

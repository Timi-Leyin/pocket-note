import {saveDraft, save} from "@/actions/save"
import { useEffect, useRef, useState} from "react"
import Header from "./Header";
import Tools from "./Tools";
import * as uuid from "uuid"
import { redirect, useNavigate } from "react-router-dom";
const Editor = () => {
  const [title, setTitle] = useState("Untitled")
  const note_editor = useRef<HTMLDivElement>(null!)
  const navigate = useNavigate()
  const onSaveDraft=()=>{
    return saveDraft({
      title,
      ref:note_editor,
    })
  }

  const onSave = () :any =>{
   return save({
      title,
      ref:note_editor,
      user_id:atob(localStorage.getItem("sid") as string)
      // user_id:"c599e74e-40ce-41f5-9b0f-ce88e41430b6"
    })
  }

  useEffect(()=>{
    onSaveDraft()
    console.log("___________-_________________")
    navigate("/notes/"+title+"-"+uuid.v1()+"-id=12")
  },[title])
  return (
    <div className="">
      
      <div className="bg-gray-900 px-8">
        <Header title={title} onTitleChange={(e)=> setTitle(e.target.value) } />
      </div>
      <Tools onSave={onSave}/>
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

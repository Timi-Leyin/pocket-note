import {saveDraft} from "@/actions/save"
import { useRef, useState} from "react"
import Header from "./Header";
import Tools from "./Tools";

const Editor = () => {
  const [title, setTitle] = useState("Untitled")
  const note_editor = useRef<HTMLDivElement>(null!)
  const onSaveDraft = ()=>{
    saveDraft({
      title,
      ref:note_editor,
      user_id:"c599e74e-40ce-41f5-9b0f-ce88e41430b6"
    })
  }

  return (
    <div className="">
      
      <div className="bg-gray-900 px-8">
        <Header title={title} onTitleChange={(e)=> setTitle(e.target.value) } />
      </div>
      <Tools onSave={onSaveDraft}/>
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

import {saveDraft} from "@/actions/save"
import {useRef} from "react"

const Editor = () => {
  const note_editor = useRef<HTMLDivElement>(null!)

  const onSaveDraft = ()=>{
    saveDraft(note_editor)
  }

  setInterval(()=>{
    onSaveDraft()
  }, 5000)
  return (
    <div className="">
      <div className="editor-wrapper">
        <div className="text-editor px-12 py-6" ref={note_editor} contentEditable="true">
          <h1 className="text-5xl">My First Pocket Note</h1>
          <h4> - Table of content</h4>
        </div>
      </div>
      <div className="editor-footer"></div>
    </div>
  );
};
export default Editor;

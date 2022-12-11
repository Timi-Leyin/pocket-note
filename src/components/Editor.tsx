import { save } from "@/actions/save";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Tools from "./Tools";
import * as uuid from "uuid";
import { useParams } from "react-router-dom";
import { currentUser } from "@/actions/user";
import { getMyNotes, getSharedNotes } from "@/actions/notes";
import { useLoader } from "../hooks";
import { Action, NoteProps } from "../interfaces";
import { date } from "../utils";
import Loading from "./Loading";
import sanitize from "@/utils/sanitize";


// ---------------------------
const _id = uuid.v1();
// ---------------------------

const Editor = () => {
  const { id } = useParams();

  const mine = useLoader(getMyNotes());
  const shared = useLoader(getSharedNotes());
  let mock_title = "Untitled";
  const note_editor = useRef<HTMLDivElement>(null!);
  const [isLoading, setIsLoading] = useState(true);
  const [last_updated, setlastUpdated] = useState("");
  const [collabs, setCollabs] = useState(Array.from(new Set([""])));
  const [action, setAction] = useState<Action>("read");
  const [currentNote, setCurrentNote] = useState<NoteProps>();
  const param_arr = id?.split("=");
  const [title, setTitle] = useState((param_arr && param_arr[0]) || mock_title);
  console.log(param_arr);
  // const onSaveDraft = () => {
  //   return saveDraft({
  //     uuid: _id,
  //     title,
  //     shared:collabs,
  //     action,
  //     ref: note_editor,
  //   });
  // };
  const { data } = useLoader(currentUser());
  const current = data
  // const user = data?.user_metadata;
console.log(current)
  const onSave = (): any => {
    return save({
      title: title || mock_title,
      action,
      shared:collabs,
      ref: note_editor,
      uuid: action !== "new" ? (param_arr && param_arr[1]) || "" : _id,
      user_id: (current && current.id) || "",
      // user_id:"c599e74e-40ce-41f5-9b0f-ce88e41430b6"
    });
  };
  useEffect(() => {
    if (action === "read" && param_arr && mine.data && shared.data) {
      const myN = mine.data.filter(
        (n: NoteProps) => n.uuid == param_arr[1]
      );
      // const sharedN = shared.data.filter(
      //   (n: NoteProps) => n.id == Number(param_arr[3]) || n.uuid == param_arr[1]
      // );
      const sharedN = shared.data.filter(
        (n: NoteProps) => n.uuid == param_arr[1]
      );
      const availableNote = [...myN, ...sharedN];
      setCurrentNote(availableNote[0]);
    }
  }, [mine, shared]);

  useEffect(() => {
    // console.clear()
    if (param_arr && param_arr.length == 1) setAction("new");
    if (param_arr && param_arr[3]) setAction("read");
    if (
      param_arr &&
      param_arr[3] &&
      current &&
      current.id === currentNote?.user_id
    ) setAction("edit");
    // 0 = title
    // 1 =uuid
    // 2 = "id"
    // 3 = id -> value
    if (action === "new") {
      // new file
      setIsLoading(false)
      console.log("NEW FILE");
    }
    console.log(action);

    if (action === "read") {
      //read file
      console.log("READ FILE");
      console.log(currentNote);
      console.log(mine);
      currentNote && setlastUpdated(date(currentNote.updated_at));
     currentNote && setIsLoading(false);
    }
  currentNote && setCollabs(Array.from(new Set(currentNote.shared || [])))
  }, [currentNote,action]);
  


  // save draft
  return (
    <div className="">
      <div className="bg-gray-900 px-8">
        <Header
          isEditable={true}
          uuid={action == "new"?_id:param_arr && param_arr[1] || ""}
          id={currentNote?.id || 0}
          title={action == "read" ? param_arr && param_arr[0] : title}
          onTitleChange={(e) => {
            console.log("Changing ", e.target.value)
            setTitle(e.target.value);
            // window.history.replaceState({}, "",`/notes/${e.target.value}=${uuid}=id=${id}`)
          }}
          action={action}
        />
      </div>
      <Tools onSave={onSave} id={0} uuid={_id} title={title} updated={last_updated} action={action} />
   {
     isLoading ? <Loading /> : action !== "read" && (
         <div className="p-1">
    <div className="text-xs mt-2 flex">
    { collabs.map((email, i)=> <span className="mr-2 p-2 bg-gray-700 rounded-md flex-center gap-2" key={i}>{email} <span className="inline-block mx-2 text-xl font-bold cursor-pointer select-none" onClick={async()=>{
      console.log(collabs)
      const filterCollabs = collabs.filter((_email, _i)=> _i != i )
     setCollabs(filterCollabs)
    const ss = await onSave()
    console.log(ss)
    }}>&times;</span> </span>)}
      </div> 
       <input type="email" placeholder="Share Note with: @email" onKeyDown={async (e:any)=>{
          if(e.which === 13 && e.target.value.length > 5 ){ 
            setCollabs(Array.from(new Set([...collabs,e.target.value]))) 
            e.target.value = ""
          const saveC = await  onSave()
          console.log(saveC)
          }
         
       }} className="p-2 bg-transparent text-xs outline-none"/>
    </div>
      )
    }
   
      <div className="editor-wrapper">
        <div className="text-editor px-2 py-2"  style={{overflowWrap:"anywhere"}}>
          {isLoading ? <Loading /> : currentNote && action != "new" ?
                                     <span ref={note_editor}  dangerouslySetInnerHTML={{
                                        __html:sanitize(atob(currentNote?.note as string)),
                                      }} suppressContentEditableWarning
                                      contentEditable={action != "read"}></span>
                                          : action == "new" ?  <span ref={note_editor}  suppressContentEditableWarning contentEditable={true}>Edit this Page</span> : "Failed to GET Note" 
          }
          {/* {isLoading ? <Loading /> : currentNote ?
                                     <span ref={note_editor}  dangerouslySetInnerHTML={{
                                        __html: atob(currentNote?.note as string),
                                      }} suppressContentEditableWarning
                                      contentEditable={action != "read"}></span>
                                          : !isLoading && action === "new" ?  <span ref={note_editor} suppressContentEditableWarning contentEditable={true}>Edit this Page</span> : "Failed to GET Note" 
          } */}
        
        </div>
      </div>
      <div className="editor-footer"></div>
    </div>
  );
};
export default Editor;

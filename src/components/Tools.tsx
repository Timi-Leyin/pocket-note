import format from "@/utils/format";
import { useState } from "react";
import {
  TextBold,
  TextItalic,
  TextUnderline,
  TextalignRight,
  Notepad,
  TextalignLeft,
  TextalignCenter,
  TextalignJustifycenter,
  NoteText,
} from "iconsax-react";
import { Action } from "../interfaces";
import { currentUser } from "@/actions/user";
import { useNavigate } from "react-router-dom";

const current = await currentUser()
console.log(current)
const Tools = ({ onSave,updated,action,id, uuid, title }: { onSave: () => any, updated:string,action:Action,id:number, uuid:string; title:string }) => {
  const [state, setState] = useState<{
    loading?: boolean;
    error?: boolean;
  }>({});
  const navigate = useNavigate()
  return (
    <div>
      <header className="bg-gray-800 py-2 items-center px-10 flex justify-between">
        <div className="w-[300px]">
          <span contentEditable="true">Georama</span>
          <span contentEditable="true">6px</span>
        </div>
        {
          action != "read" && (
            <div className="flex gap-3 editor-tools">
          <button onClick={() => format("bold")}>
            <TextBold size="16px" />
          </button>
          <button onClick={() => format("italic")}>
            <TextItalic size="16px" />
          </button>

          <button onClick={() => format("underline")}>
            <TextUnderline size="16px" />
          </button>

          <button onClick={() => format("justifyRight")}>
            <TextalignRight size="16px" />
          </button>

          <button onClick={() => format("justifyLeft")}>
            <TextalignLeft size="16px" />
          </button>

          <button onClick={() => format("justifyCenter")}>
            <TextalignCenter size="16px" />
          </button>

          <button onClick={() => format("insertOrderedList")}>
            <NoteText size="16px" />
          </button>
          {/* <button onClick={() => format("justify")}>
            <TextalignJustifycenter size="16px" />
          </button> */}
        </div>
          )
        }

        <div className="">      
          <span className="text-xs mx-1">{updated && "Updated "+ updated} </span>
         {
           action != "read" && (
            current[1] ? (
            <button
            className="p-2 text-xs px-7 bg-green-700 rounded-md"
            disabled={state.loading}
            onClick={async () => {
              setState({ loading: true, error: false });
           const res = !state.loading &&  await onSave();
           console.log(res)
              if (typeof res[0] == null) setState({ loading: false, error: true });
              if (typeof res[1] == null) setState({ loading: false, error: false });
              setState({...state, loading:false});
             (!state.error && !state.loading && action=="new" ) && window.location.replace(`/notes/${title}=${uuid}=id=${id}`)
            console.log(window.history);
            //  (!state.error && !state.loading && action=="new" ) && window.history.replaceState({}, "",`/notes/${title}=${uuid}=id=${id}`)
            }}
          >
            {state.loading ? "Saving...": !state.error
              ? "Note Saved" : state.error?"Failed":"Save Note"
            }
          </button>
          ) : <span className="text-sm font-bold">Sign in to save note</span>
           )
         }
        </div>
      </header>
    </div>
  );
};
export default Tools;

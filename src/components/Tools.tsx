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

const current = await currentUser()
console.log(current)
const Tools = ({ onSave,updated,action }: { onSave: () => any, updated:string,action:Action }) => {
  const [state, setState] = useState<{
    loading?: boolean;
    error?: boolean;
  }>({});
  console.log(action)
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
              if (typeof res[0] == null) setState({ loading: false, error: true });
              if (typeof res[1] == null) setState({ loading: false, error: false });
              setState({...state, loading:false})
              // console.clear();
              console.log(res)
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

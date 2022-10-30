import format from "@/utils/format";
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

const Tools = ({onSave}:{onSave:()=> void}) => {
  return (
    <div>
      <header className="bg-gray-800 py-2 items-center px-10 flex justify-between">
        <div className="w-[300px]">
          <span contentEditable="true">Georama</span>
          <span contentEditable="true">6px</span>
        </div>
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

        <div className="">
          <span className="text-xs mx-1">Updated 3 days ago</span>
          <button className="p-2 text-xs px-7 bg-green-700 rounded-md" onClick={()=>{
            console.log("Saving...")
            onSave()
            console.log("Saved!!!")
          }}>
            Save Note
          </button>
        </div>
      </header>
    </div>
  );
};
export default Tools;

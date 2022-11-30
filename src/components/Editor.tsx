import { saveDraft, save } from "@/actions/save";
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

// ---------------------------
const _id = uuid.v1();
const current = await currentUser();
// ---------------------------

const Editor = () => {
  const { id } = useParams();

  const mine = useLoader(getMyNotes());
  const shared = useLoader(getSharedNotes());
  let mock_title = "Untitled";
  const note_editor = useRef<HTMLDivElement>(null!);
  const [isLoading, setIsLoading] = useState(true);
  const [last_updated, setlastUpdated] = useState("");
  const [action, setAction] = useState<Action>("read");
  const [currentNote, setCurrentNote] = useState<NoteProps>();
  const param_arr = id?.split("=");
  const [title, setTitle] = useState((param_arr && param_arr[0]) || mock_title);
  console.log(param_arr);
  const onSaveDraft = () => {
    return saveDraft({
      uuid: _id,
      title,
      action,
      ref: note_editor,
    });
  };

  const onSave = (): any => {
    return save({
      title: title || mock_title,
      action,
      ref: note_editor,
      uuid: action !== "new" ? (param_arr && param_arr[1]) || "" : _id,
      user_id: (current[1] && current[1].id) || "",
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
      current[1] &&
      current[1].id === currentNote?.user_id
    ) setAction("edit");
    // 0 = title
    // 1 =uuid
    // 2 = "id"
    // 3 = id -> value
    if (action === "new") {
      // new file
      console.log("NEW FILE");
    }
    console.log(action);

    if (action === "read") {
      //read file
      console.log("READ FILE");
      console.log(currentNote);
      console.log(mine);
      currentNote && setlastUpdated(date(currentNote.updated_at));
      setIsLoading(false);
    }
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
      <div className="editor-wrapper">
        <div className="text-editor px-12 py-6">
          {isLoading ? (
            <Loading />
          ) : action == "new" ? (
            <span ref={note_editor} suppressContentEditableWarning
            contentEditable={true}>
              Edit this Page
            </span>
          ) : (
            ""
          )}

          {currentNote && action != "new" && !isLoading ? (
            <span
              ref={note_editor}
              dangerouslySetInnerHTML={{
                __html: atob(currentNote?.note as string),
              }}
              suppressContentEditableWarning
              contentEditable={action != "read" ? true : false}
            ></span>
          ):<span>Failed to load note</span>}
        </div>
      </div>
      <div className="editor-footer"></div>
    </div>
  );
};
export default Editor;

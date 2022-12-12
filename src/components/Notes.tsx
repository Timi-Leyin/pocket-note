import Note from "./Note";
import { getMyNotes, getSharedNotes } from "@/actions/notes";
import { useLoader } from "@/hooks/index";
import { CloudRemove, Google } from "iconsax-react";
import Loading from "@/components/Loading";
import { Key, useEffect } from "react";
import { NoteProps } from "@/interfaces/index";

import { Link } from "react-router-dom";
import { Add } from "iconsax-react";
import { signin } from "@/actions/auth";

const Notes = () => {
  const { loading, error, data } = useLoader(getMyNotes());
  const shared = useLoader(getSharedNotes());

  return (
    <section className="container px-5">
     <div className="flex justify-between w-full items-center">
     <h1 className="text-4xl font-bold">My Notes</h1>
      <Link to="/notes/new">
        <button className="p-2 rounded-full bg-white text-black w-[50px] h-[50px] flex-center">
          <Add />
        </button>
      </Link>
     </div>
      <div className="notes my-4">
        {loading && <Loading />}
        {data &&
          data.map((note: NoteProps, i: Key) => (
            // <div key={i}>
              <Note key={i} data={note} />
            // </div>
          ))}
      </div>
      {error && (
        <div className="">
          <p className="flex items-center gap-1 opacity-70  pb-4 font-bold">
            <CloudRemove />
            {"Notes are not available currently."}
          </p>
          <button
              className="p-3 bg-red-500 px-7 rounded-full gap-3 flex-center text-xs"
              onClick={() => signin()}
            >
            <span className="">Sign in</span> <Google variant="Bold" size="16px" />
            </button>
        </div>
      )}
      <h2 className="text-4xl font-bold my-7">Shared Notes</h2>
      <div className="notes my-8">
        {shared.loading ? (
          <Loading />
        ) : shared.error ? (
          <div className="">
            <p className="flex items-center gap-1 opacity-70  pb-8 font-bold">
              <CloudRemove />
              {"Error occured getting notes"}
            </p>
          </div>
        ) : shared.data ? (
          shared.data.map((note: NoteProps, i: Key) => (
            // <div key={i}>
              <Note key={i} data={note} />
            // </div>
          ))
        ) : (
          <div className="">
            <p className="flex items-center gap-1 opacity-70  pb-8 font-bold">
              <CloudRemove />
              {"You don't have a shared note"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
export default Notes;

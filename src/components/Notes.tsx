import Note from "./Note";
import { getMyNotes, getSharedNotes } from "@/actions/notes";
import { useLoader } from "@/hooks/index";
import { CloudRemove } from "iconsax-react";
import Loading from "@/components/Loading";
import { Key, useEffect } from "react";
import { NoteProps } from "@/interfaces/index";
import { supabase } from "../supabase";

import { Link } from "react-router-dom";
import { Add } from "iconsax-react";

const Notes = () => {
  const { loading, error, data } = useLoader(getMyNotes());
  const shared = useLoader(getSharedNotes());
  useEffect(() => {
    supabase
      .channel("*")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe((status) => {
        console.log(status);
      });
  }, []);
  return (
    <section className="container p-4 pt-16">
      <h1 className="text-4xl font-bold">My Notes</h1>
      <Link to="/notes/new">
        <button className="p-2 my-3 rounded-full bg-white text-black w-[50px] h-[50px] flex-center">
          <Add />
        </button>
      </Link>
      <div className="notes flex gap-3 flex-wrap my-8">
        {loading && <Loading />}
        {data &&
          data.map((note: NoteProps, i: Key) => (
            <div key={i}>
              <Note data={note} />
            </div>
          ))}
      </div>
      {error && (
        <div className="">
          <p className="flex items-center gap-1 opacity-70  pb-8 font-bold">
            <CloudRemove />
            {"Notes are not available currently."}
          </p>
        </div>
      )}
      <h2 className="text-4xl font-bold my-5">Shared Notes</h2>
      <div className="notes flex gap-3 flex-wrap my-8">
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
            <div key={i}>
              <Note data={note} />
            </div>
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

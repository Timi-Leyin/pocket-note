import Note from "./Note";
import { getMyNotes } from "@/actions/notes";
import {useLoader} from "@/hooks/index";
import Loading from '@/components/Loading'
import { Key } from "react";
import { NoteProps } from "../interfaces";

const Notes = () => {
  const {loading, error, data} = useLoader(getMyNotes())
  console.log(error)
  return (
    <section className="py-6">
      <h1 className="text-4xl font-bold my-2">My Notes</h1>
      <div className="notes flex gap-3 my-8">
        {loading && (
          <Loading />
        )}
        {data && data.map((note: NoteProps, i: Key) => (
          <div key={i}>
          <Note data={note} />
            </div>
          ))}
          {error && (
            <p>{error}</p>
          )}
      </div>
      <h2 className="text-4xl font-bold my-5">Shared Notes</h2>
    </section>
  );
};
export default Notes;

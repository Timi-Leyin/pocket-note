import Note from "./Note";
import { getMyNotes, getSharedNotes } from "@/actions/notes";
import {useLoader} from "@/hooks/index";
import {CloudRemove} from "iconsax-react"
import Loading from '@/components/Loading'
import { Key } from "react";
import { NoteProps } from "@/interfaces/index";

const Notes = () => {
  const {loading, error, data} = useLoader(getMyNotes())
  const shared = useLoader(getSharedNotes())
  return (
    <section className="py-6">
      <h1 className="text-4xl font-bold my-2">My Notes</h1>
      <div className="notes flex gap-3 flex-wrap my-8">
        {loading && (
          <Loading />
        )}
        {data && data.map((note: NoteProps, i: Key) => (
          <div key={i}>
          <Note data={note} />
            </div>
          ))}
      </div>
          {error && (
            <div className="">
              <p className="flex items-center gap-1 opacity-70  pb-8 font-bold"><CloudRemove />{"Notes are not available currently."}</p>
            </div>
          )}
      <h2 className="text-4xl font-bold my-5">Shared Notes</h2>
      <div className="notes flex gap-3 flex-wrap my-8">
        {
          shared.loading?  <Loading />: shared.error? (
            <div className="">
            <p className="flex items-center gap-1 opacity-70  pb-8 font-bold"><CloudRemove />{"Error occured getting notes"}</p>
          </div>
          ):shared.data ?(
           shared.data.map((note: NoteProps, i: Key) => (
            <div key={i}>
            <Note data={note} />
              </div>
            ))
          ):(
            <div className="">
            <p className="flex items-center gap-1 opacity-70  pb-8 font-bold"><CloudRemove />{"You don't have a shared note"}</p>
          </div>
          )
        }
      </div>
    </section>
  );
};
export default Notes;

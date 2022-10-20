import Note from "./Note";

import { supabase } from "@/supabase/index";
let { data: notes, error } = await supabase.from("notes").select("*");

const Notes = () => {
  console.log(notes);
  return (
    <section className="py-6">
      <h1 className="text-4xl font-bold my-2">My Notes</h1>
      <div className="notes flex gap-3 my-8">
        <Note data={""} />
        {/* {notes &&
          !error &&
          notes.map((data, i) => (
            <div key={i}>
            </div>
          ))} */}
      </div>
      <h2 className="text-4xl font-bold my-5">Shared Notes</h2>
    </section>
  );
};
export default Notes;

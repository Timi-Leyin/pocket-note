import Note from "./Note";

const Notes = () => {
  return (
    <section className="py-6">
      <h1 className="text-4xl font-bold">My Notes</h1>
      <div className="notes mt-8">
        <Note />
      </div>
    </section>
  );
};
export default Notes;

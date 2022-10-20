import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Note from "@/pages/Note";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/notes/:id" element={<Note />} />
    </Routes>
  );
}

export default App;

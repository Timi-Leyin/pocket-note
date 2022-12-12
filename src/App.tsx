import { Routes, Route, redirect, Link } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Note from "@/pages/Note";
import { useEffect } from "react";
import { supabase } from "@/supabase/index";
import { BackSquare } from "iconsax-react";
import Logo from "./components/Logo";

function App() {
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
    <Routes>
      <Route path="/" index element={<Dashboard />} />
      <Route path="/notes/:id" element={<Note />} />
      <Route
        path="*"
        element={
          <div>
            <div className="my-5">
              <Logo />
              <h1 className="text-3xl my-2 font-bold text-center">
                404 - PAGE NOT FOUND
              </h1>
              <Link to="/">
                <button className="p-3 m-auto my-6 bg-red-500 px-7 rounded-full gap-3 flex-center text-xs">
                  <span className="">Go Back Home</span>{" "}
                  <BackSquare variant="Bold" size="16px" />
                </button>
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;

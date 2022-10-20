import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Add } from "iconsax-react";
const Sidebar = () => {
  return (
    <aside className="p-4 flex items-center gap-3 flex-col h-screen text-center">
      <Logo />

      <Link to="/notes/3d4t4tggg45-note-name">
        <button className="p-2 my-3 rounded-full bg-white text-black w-[50px] h-[50px] flex-center">
          <Add />
        </button>
      </Link>
      <ul className="notes-icon"></ul>
    </aside>
  );
};
export default Sidebar;

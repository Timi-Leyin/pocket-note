import Logo from "./Logo";
import { Add } from "iconsax-react";
const Sidebar = () => {
  return (
    <aside className="p-4 flex items-center gap-3 flex-col h-screen text-center">
      <Logo />

      <a href="/new">
        <button className="p-2 my-3 rounded-full bg-white text-black w-[50px] h-[50px] flex-center">
          <Add />
        </button>
      </a>
      <ul className="notes-icon"></ul>
    </aside>
  );
};
export default Sidebar;

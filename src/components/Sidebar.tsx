import Logo from "./Logo";
import { Add } from "iconsax-react";
const Sidebar = () => {
  return (
    <aside className="p-4 flex-center gap-3 flex-col text-center">
      <Logo />

      <button className="p-2 my-3 rounded-full bg-white text-black w-[50px] h-[50px] flex-center">
        <Add />
      </button>
      <ul className="notes-icon"></ul>
    </aside>
  );
};
export default Sidebar;

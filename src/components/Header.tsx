import { Google, SearchNormal1 } from "iconsax-react";
import Search from "./Search";

const Header = () => {
  return (
    <header className="flex items-center justify-between mt-4 w-full">
      {/* search */}
      <Search />

      {/*  */}
      <button className="p-2 bg-[#141414] px-8 rounded-full gap-3 flex-center ">
        Sign in <Google variant="Bold" />
      </button>
    </header>
  );
};
export default Header;

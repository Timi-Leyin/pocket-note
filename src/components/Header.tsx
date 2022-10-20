import { HeaderProps } from "@/interfaces/index";
import { Google, SearchNormal1, TicketDiscount } from "iconsax-react";
import Search from "./Search";

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex items-center px-2 justify-between p-3 w-full">
      {/* search */}
      <Search />
      {title && (
        <h3 className="font-bold text-xl flex-center gap-1">
          <TicketDiscount />{" "}
          <span className="opacity-50 focus:opacity-100" contentEditable>
            Pocket Title
          </span>
        </h3>
      )}

      {/*  */}
      <button className="p-2 bg-red-500 px-7 rounded-full gap-3 flex-center text-xs">
        Sign in <Google variant="Bold" size="16px" />
      </button>
    </header>
  );
};
export default Header;

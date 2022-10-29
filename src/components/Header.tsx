import { HeaderProps } from "@/interfaces/index";
import { Google, SearchNormal1, TicketDiscount } from "iconsax-react";
import Search from "./Search";
import {signin} from "@/actions/auth"
import { useLoader } from "@/hooks/index";
import { currentUser } from "@/actions/user";

const Header = ({ title }: HeaderProps) => {
  const {loading, error, data} = useLoader(currentUser())
  console.log(error, loading, data)
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
      <button className="p-2 bg-red-500 px-7 rounded-full gap-3 flex-center text-xs" onClick={()=> signin()}>
        Sign in <Google variant="Bold" size="16px" />
      </button>
    </header>
  );
};
export default Header;

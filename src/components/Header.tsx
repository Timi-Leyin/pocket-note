import { HeaderProps } from "@/interfaces/index";
import { Google, SearchNormal1, TicketDiscount } from "iconsax-react";
import Search from "./Search";
import { signin } from "@/actions/auth";
import { useLoader } from "@/hooks/index";
import { currentUser } from "@/actions/user";
import Loading from "./Loading";

const Header = ({ title, onTitleChange }: HeaderProps) => {
  const { loading, data } = useLoader(currentUser());
  const user = data?.user_metadata
  return (
    <header className="flex items-center px-2 justify-between p-3 w-full">
      {/* search */}
      <Search />
      {title && (
        <h3 className="font-bold text-xl flex-center gap-1">
          <TicketDiscount />{" "}
          <input className="opacity-50 bg-transparent outline-none border-none focus:opacity-100" onChange={onTitleChange} value={title} />
        </h3>
      )}

      {/*  display loading*/}
      <div className="">
        {loading ? (
          <Loading />
        ) : user ? (
          <div className="flex gap-1">
            {/* show avatar if loading = false && data exists */}
            <img
              src={user?.avatar_url}
              className="w-[50px] h-[50px] ring-2 select-none pointer-events-none ring-gray-100 rounded-full object-cover"
              alt={user?.email}
            />
          </div>
        ) : (
          // show sign in button if loading = false && there is no current logged user
          <button
            className="p-2 bg-red-500 px-7 rounded-full gap-3 flex-center text-xs"
            onClick={() => signin()}
          >
            Sign in <Google variant="Bold" size="16px" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

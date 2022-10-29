import { HeaderProps } from "@/interfaces/index";
import { Google, SearchNormal1, TicketDiscount } from "iconsax-react";
import Search from "./Search";
import { signin } from "@/actions/auth";
import { useLoader } from "@/hooks/index";
import { currentUser } from "@/actions/user";
import Loading from "./Loading";

const Header = ({ title }: HeaderProps) => {
  const { loading, error, data } = useLoader(currentUser());
  console.log(error, loading, data);
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

      {/*  display loading*/}
      <div className="">
        {loading ? (
          <Loading />
        ) : data ? (
          <div className="flex gap-1">
            {/* show avatar if loading = false && data exists */}
            <img
              src={data?.avatar_url}
              className="w-[50px] h-[50px] ring-2 select-none pointer-events-none ring-gray-100 rounded-full object-cover"
              alt={data?.email}
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

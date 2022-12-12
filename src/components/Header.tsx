import { HeaderProps } from "@/interfaces/index";
import { Google, SearchNormal1, TicketDiscount } from "iconsax-react";
import Search from "./Search";
import { signin, logout } from "@/actions/auth";
import { useLoader } from "@/hooks/index";
import { currentUser } from "@/actions/user";
import Loading from "./Loading";
import Logo from "./Logo";

const Header = ({
  title,
  onTitleChange,
  action,
  uuid,
  id,
  isEditable,
  mock_title
}: HeaderProps) => {
  const { loading, data } = useLoader(currentUser());
  const user = data?.user_metadata;
  // console.log(user)

  return (
    <header className="w-full p-4 z-10">
      <div className="container flex items-center justify-around md:justify-between mx-auto">
        {/* Logo */}
<div className="flex-center gap-3">
        <Logo />
        {/* Search Bar */}
  { user && <Search />}
</div>

        <div className=" md:block md-w:auto">
          {isEditable && (
            <div className="font-bold text-xl flex-center gap-1">
              <TicketDiscount />
              <input
                type="text"
                className="opacity-50 bg-transparent outline-none w-full border-none p-1 focus:opacity-100"
                placeholder="Untitled..."
                onChange={(e: any) => {
                  const isMatched = (e.target.value.match(/^\s/) || e.target.value == "") ;
                  if (onTitleChange) {
                    onTitleChange(e);
                    const url =e.target.value.split(" ").join("-").trim() 
                    action != "new"
                      ? window.history.replaceState(
                          {},
                          "",
                          `/notes/${isMatched ? mock_title : url}=${uuid}=id=${id}`
                        )
                      : window.history.replaceState(
                          {},
                          "",
                          `/notes/${isMatched ? mock_title :url}`
                        );
                  }
                }}
                value={title}
                disabled={action === "read"}
              />
            </div>
          )}
        </div>

        {/*  Conditional Rendering for Avatar */}
        <div className="">
          {loading ? (
            <Loading />
          ) : user ? (
            <div className=" gap-1 relative">
              {/* show avatar if loading = false && data exists */}
              <img
                src={user?.avatar_url}
                className="w-[50px] h-[50px] ring-2 select-none pointer-events-none ring-gray-100 rounded-full object-cover"
                alt={user?.full_name}
              />
              <p className="p-1 font-bold text-lg absolute" onClick={()=> logout()}>Logout</p>
            </div>
          ) : (
            // show sign in button if loading = false && there is no current logged user
            <button
              className="p-3 bg-red-500 px-7 rounded-full gap-3 flex-center text-xs"
              onClick={() => signin()}
            >
            <span className="hidden sm:block">Sign in</span> <Google variant="Bold" size="16px" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

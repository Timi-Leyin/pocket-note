import { HeaderProps } from "@/interfaces/index";
import { Google, SearchNormal1, TicketDiscount } from "iconsax-react";
import Search from "./Search";
import { signin } from "@/actions/auth";
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
}: HeaderProps) => {
  const { loading, data } = useLoader(currentUser());
  const user = data?.user_metadata;
  // console.log(user)

  return (
    <header className="w-full h:max-content top-0 left-0 p-3 z-10">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        {/* Logo */}
        <Logo />

        {/* Search Bar */}

        <div className="hidden md:block md-w:auto">
          <Search />
          {isEditable && (
            <div className="font-bold text-xl flex-center gap-1">
              <TicketDiscount />
              <input
                type="text"
                className="opacity-50 bg-transparent outline-none border-none p-1 focus:opacity-100"
                placeholder="Untitled..."
                onChange={(e: any) => {
                  if (onTitleChange) {
                    onTitleChange(e);
                    action != "new"
                      ? window.history.replaceState(
                          {},
                          "",
                          `/notes/${e.target.value}=${uuid}=id=${id}`
                        )
                      : window.history.replaceState(
                          {},
                          "",
                          `/notes/${e.target.value}`
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
            <div className="flex gap-1">
              {/* show avatar if loading = false && data exists */}
              <img
                src={user?.avatar_url}
                className="w-[50px] h-[50px] ring-2 select-none pointer-events-none ring-gray-100 rounded-full object-cover"
                alt={user?.full_name}
              />
            </div>
          ) : (
            // show sign in button if loading = false && there is no current logged user
            <button
              className="p-6 bg-red-500 px-7 rounded-full gap-3 flex-center text-xs"
              onClick={() => signin()}
            >
              Sign in <Google variant="Bold" size="16px" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

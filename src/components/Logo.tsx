import { Notepad2 } from "iconsax-react";
import {Link} from "react-router-dom"

const Logo = () => {
  return (
   <Link to="/">
    <h2 className="font-bold text-2xl flex-center gap-1">
      <div className="p-2 bg-white rounded-full text-black">
        <Notepad2 />
      </div>{" "}
      <span className="dark:text-white hidden md:block">Pocket</span>
    </h2>
    </Link>
  );
};
export default Logo;

import { Notepad2 } from "iconsax-react";

const Logo = () => {
  return (
    <h2 className="font-bold text-2xl flex-center gap-1">
      <div className="p-2 bg-white rounded-full text-black">
        <Notepad2 />
      </div>{" "}
      <span className="dark:text-white">Pocket</span>
    </h2>
  );
};
export default Logo;

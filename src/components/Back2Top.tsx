import { SidebarTop } from "iconsax-react";
import { useState } from "react";

const Back2Top = ()=>{
    const [scrollPos, setScrollPos] = useState(window.scrollY);
  window.addEventListener("scroll", () => {
    setScrollPos(window.scrollY);
  });
return scrollPos > 400 ? <div onClick={() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }} className="fixed bottom-[5%] right-[20px] bg-gray-800 font-bold rounded-md cursor-pointer text-sm p-3 flex items-center gap-3"><p>Back to Top</p> <SidebarTop size="15px" /> </div> : null
};
export default Back2Top
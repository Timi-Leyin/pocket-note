import { SearchNormal1 } from "iconsax-react";
import { useState } from "react";
import Loading from "./Loading";

const Search = () => {
  const [isSearching, setIsSearch] = useState(false);
  const SearchQuery = () => {
    setIsSearch(true);
  };
  return (
    <div className="relative">
      <div className="flex gap-2 items-center p-2 bg-[#242424] rounded-lg">
        <SearchNormal1 variant="Bulk" size="20px" />
        <input
          placeholder="Search ..."
          onChange={SearchQuery}
          onBlur={() => {
            setIsSearch(false);
          }}
          className="bg-transparent outline-none"
        />
      </div>
      
      {isSearching && (
        <div className="p-4 my-1 shadow-sm bg-gray-700 rounded-md absolute w-full  ">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Search;

import { SearchNormal1 } from "iconsax-react";

const Search = () => {
  return (
    <div className="flex gap-2 items-center p-2 bg-[#141414] rounded-lg">
      <SearchNormal1 variant="Bulk" size="20px" />
      <input placeholder="Search ..." className="bg-transparent outline-none" />
    </div>
  );
};
export default Search;

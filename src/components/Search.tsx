import { SearchNormal1 } from "iconsax-react";
import { useState, useRef, useEffect, SetStateAction } from "react";
import Loading from "./Loading";
import { currentUser } from "@/actions/user";
import { getMyNotes, getSharedNotes } from "@/actions/notes";
import { useLoader } from "../hooks";
import { Link } from "react-router-dom";
import { date } from "../utils";
import { decrypt } from "@/utils/hash";

// --------
// --------

const Search = () => {
  const { data } = useLoader(currentUser());
  const user = data;
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [notes, setNotes] = useState<any>();
  const searchRef = useRef<HTMLInputElement>(null!);

  const SearchQuery = async (e: any) => {
    const results: any[] = [];
    const query = e.target.value;
    if (notes && !isLoading) {
      // console.log("Ready to Search !!")
      // console.log(notes)
      setSearchResult([]);
      // console.log(notes)
      for (let i = 0; i < notes.length; i++) {
        const note = document.createElement("div");
        note.innerHTML = decrypt(notes[i].note);
        // console.log(note)
        // const len = note.textContent.length
        // const title = notes[i].title;
        const filter1 = note.textContent
          ?.toLowerCase()
          .match(new RegExp(query, "igm"));
        //  const filter1= note.textContent?.toLowerCase().indexOf(query.toLowerCase())
        // const filter2=title.toLowerCase().indexOf(query.toLowerCase())
        const pattern = /\S{1,}/g
        if (filter1 && pattern.test(query) && query.length >=3 ) {
          // console.log(filter1)
          results.push({
            index: i,
            matches: filter1,
          });
          setSearchResult(results)
          // return;
        }
      }
    } else {
      // console.log("Retrying...");
      fetchNotes();
    }
    // console.log(notes)
  };

  const fetchNotes = async () => {
    // console.log("Fetching...");
    const [my_err, my] = await getMyNotes();
    const [shared_err, shared] = await getSharedNotes();
    setNotes([...my, ...shared]);
  };

  useEffect(() => {
    // console.log(searchResult);
  }, [searchResult]);

  useEffect(() => {
    fetchNotes();
    notes && setIsLoading(false);
    // notes && console.log("Done");
  }, [notes]);
  useEffect(() => {
    // console.log(searchRef.current)
    if (searchRef && isSearching) {
      searchRef.current.focus();
    }
  }, [searchRef, isSearching]);
  return (
    <>
      <div className="relative mx-1">
        <div
          onClick={() => setIsSearch(true)}
          className="flex gap-2 items-center p-2 bg-[#242424] rounded-lg"
        >
          <SearchNormal1 variant="Bulk" size="20px" />
          <input
            placeholder="Search (ctrl + k)"
            // onBlur={() => {
            //   setIsSearch(false);
            // }}
            className="bg-transparent hidden md:block outline-none w-full"
          />
        </div>

        {/* {isSearching && (
        <div className="p-4 my-1 shadow-sm bg-gray-700 rounded-md absolute w-full  ">
          <Loading />
        </div>
      )} */}
      </div>

      {isSearching && (
        <div>
          <div
            className="fixed top-0 left-0 w-full  h-full bg-black/70 bg-blur z-[11]"
            onClick={() => setIsSearch(false)}
          ></div>
          <div className="bg-gray-300 p-6 fixed top-6 w-3/4 m-auto h-3/4 min-h-1/2 left-[50%] translate-x-[-50%] rounded-md bg-blur z-[12]">
            <h3 className="text-2xl font-bold text-black py-3">
              Search Notes{" "}
            </h3>
            <div className="flex gap-2 items-center p-2 bg-[#242424] rounded-lg">
              <SearchNormal1 variant="Bulk" size="20px" />
              <input
                placeholder="Search (ctrl + k)"
                ref={searchRef}
                onChange={SearchQuery}
                type="search"
                className="bg-transparent w-full outline-none"
              />
            </div>
            <h4 className="text-2xl text-black font-bold my-2">Results</h4>
          <div className="h-3/4 w-full overflow-auto">
              {isLoading ? (
              <Loading />
            ) : (
              searchResult.map((result: any, i: any) => (
               <>
                <a className="text-black" href={`/notes/${notes[result.index].title}=${notes[result.index].uuid}=id=${notes[result.index].id}`}>
                  <p className="font-bold text-lg my-0">{notes[result.index].title}</p>
              {
                result.matches.map((val:string)=><div className="py-1">
                    <span className="bg-gray-600 block p-1 px-3">{val}</span>
                  </div>)
              }
              <p>{date(notes[result.index].updated_at)}</p>
                </a>
               </>
              ))
            )}
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;

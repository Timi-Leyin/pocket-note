import { SearchNormal1 } from "iconsax-react";
import { useState,useRef, useEffect } from "react";
import Loading from "./Loading";
import {currentUser} from "@/actions/user"
import {getMyNotes, getSharedNotes} from "@/actions/notes"

// --------
const user = await currentUser()
// --------


const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [notes, setNotes] = useState([]);
  const searchRef = useRef(null!);

  const SearchQuery = async(e) => {
    const results =[]
    const query = e.target.value
    if(!notes && !isLoading){
      console.log("Retrying...")
      fetchNotes()
    }else{
      console.log("Ready to Search !!")
      console.log(notes)
      for(let i =0; i<notes.length;i++){
        const note = document.createElement("div")
        note.textContent = atob(notes[i].note)
       const title = notes[i].title
     const filter1= note.toLowerCase().indexOf(query.toLowerCase()) 
      const filter2=title.toLowerCase().indexOf(query.toLowerCase()) 
      if(filter1 > -1){
        console.log(filter1, filter2)
        return
      }
      
     }
    }
    console.log(searchResult)
    console.log(results)
    setSearchResult(results)
  };

  const fetchNotes =async () => {
    console.log("Fetching...")
    const [my_err, my] = await getMyNotes()
    const [shared_err, shared] = await getSharedNotes()
    setNotes([...my,...shared])
   setIsLoading(false)
  }

  useEffect(()=>{
    console.log(searchResult)
  },[searchResult])

  useEffect(()=>{
  fetchNotes()
  },[])
  useEffect(()=>{
    // console.log(searchRef.current)
    if(searchRef && isSearching){
      searchRef.current.focus()
    }
  },[searchRef,isSearching])
  return (
   <>
    <div className="relative mx-1">
      <div onClick={()=>setIsSearch(true)} className="flex gap-2 items-center p-2 bg-[#242424] rounded-lg">
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

    {
      isSearching && (
      <div>
          <div className="fixed top-0 left-0 w-full h-full bg-black/70 bg-blur z-[11]" onClick={()=>setIsSearch(false)}>
          </div>
          <div className="bg-gray-300 p-6 fixed top-6 w-3/4 m-auto h-1/2 left-[50%] translate-x-[-50%] rounded-md bg-blur z-[12]">
        <h3 className="text-2xl font-bold text-black py-3">Search Notes </h3>
          <div  className="flex gap-2 items-center p-2 bg-[#242424] rounded-lg">
        <SearchNormal1 variant="Bulk" size="20px" />
        <input
          placeholder="Search (ctrl + k)"
          ref={searchRef}
          onChange={SearchQuery}
          type="search"
          className="bg-transparent outline-none"
        />
      </div>
      <Loading />
          </div>
        </div>
      )
    }
   </>

  );
};

export default Search;

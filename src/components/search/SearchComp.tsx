import React, { useState, useEffect } from "react";
import TextBlueLink from "../reusableComp/TextBlueLink";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SearchProfileComp from "./SearchProfileComp";
import useDebounce from "../../hook/useDebounce";
import { searchUser } from "../../apis/user/userApi";
import TextLightGraySmall from "../reusableComp/TextLightGraySmall";

const SearchComp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms debounce delay

  const handleChange = (e) => setSearchQuery(e.target.value);

  const fetchUserByQuery = async () => {
    const res = await searchUser(debouncedSearchQuery);
    setSearchResults(res?.data);
  };

  // Fetch search results based on the debounced search query
  useEffect(() => {
    if (debouncedSearchQuery) {
      console.log(debouncedSearchQuery);
      fetchUserByQuery();
    }
  }, [debouncedSearchQuery]); // Re-run this effect when debouncedSearchQuery changes

  return (
    <div className="w-[50%] mx-auto">
      <h1 className="font-bold text-2xl mt-4 mb-8">Search</h1>
      <div className="search-box w-full border-b-[1px] border-b-[var(--outliner-color)]">
        <input
          value={searchQuery}
          onChange={handleChange}
          type="text"
          className="w-full px-3 py-2 focus:outline-none rounded-md bg-[var(--btn-background-color)] mb-8"
          placeholder="Search"
        />
      </div>

      {searchQuery === "" ? (
        <div className="recents">
          <div className="head flex justify-between my-4">
            <span>Recent</span>
            <TextBlueLink text={"Clear all"} />
          </div>
          <TextLightGraySmall text={"No recent searches"} />
        </div>
      ) : (
        <div className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map((user, idx) => (
              <SearchProfileComp key={idx} user={user} />
            ))
          ) : (
            <div>No users found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComp;

"use client"

import { useSearchQuery } from '@/state/api';
import { debounce } from "lodash";
import React, { useEffect, useState } from 'react'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const {
      data: searchResults,
      isLoading,
      isError,
    } = useSearchQuery(searchTerm, {
      skip: searchTerm.length < 3,
    });
  
    const handleSearch = debounce(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      },
      500,
    );
  
    useEffect(() => {
      return handleSearch.cancel;
    }, [handleSearch.cancel]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a movie..."
                onChange={handleSearch}
            />
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error</div>}
            {searchResults?.map((result) => (
                <div key={result.id}>{result.title}</div>
            ))}
        </div>
    )};

export default Search
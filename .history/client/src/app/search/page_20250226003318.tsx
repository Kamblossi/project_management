"use client"

import { useSearchQuery } from '@/state/api';
import { debounce } from "lodash";
import React, { useState } from 'react'

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
  
    return (
      <div>
        <input type="text" onChange={handleSearch} placeholder="Search..." />
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred.</p>}
        {searchResults && <ul>
          {searchResults.map((result: any) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>}
      </div>
    );
  }

export default Search;

export default Search
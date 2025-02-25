"use client"

import React from 'react'

type Props = {}

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const {
      data: searchResults,
      isLoading,
      isError,
    } = useSearchQuery(searchTerm, {
      skip: searchTerm.length < 3,
    });
    
  return (
    <div>Search</div>
  )
}

export default Search
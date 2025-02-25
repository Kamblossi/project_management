"use client"

import { useSearchQuery } from '@/state/api';
import React from 'react'

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
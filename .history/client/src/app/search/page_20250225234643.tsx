"use client"

import { useSearchQuery } from '@/state/api';
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
    
const handleSearch = (e: React.FormEvent) => {    
  return (
    <div>Search</div>
  )
}

export default Search
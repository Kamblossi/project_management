"use client"

import { useSearchQuery } from '@/state/api';
import { debounce } from 'lodas';
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

export default Search
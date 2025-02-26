"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: searchResults, isLoading, isError } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3, // Prevent API call for short queries
  });

  // Debugging: Log API responses
  useEffect(() => {
    console.log("Search Term:", searchTerm);
    console.log("Search Results:", searchResults);
  }, [searchTerm, searchResults]);

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500 // Delay API call to optimize performance
  );

  useEffect(() => {
    return () => handleSearch.cancel();
  }, []);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500">Error occurred while fetching search results.</p>}
        
        {!isLoading && !isError && searchResults && (
          <div>
            {/* Tasks Section */}
            {searchResults.tasks?.length > 0 && (
              <>
                <h2 className="text-lg font-semibold">Tasks</h2>
                {searchResults.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </>
            )}

            {/* Projects Section */}
            {searchResults.projects?.length > 0 && (
              <>
                <h2 className="text-lg font-semibold mt-4">Projects</h2>
                {searchResults.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </>
            )}

            {/* Users Section */}
            {searchResults.users?.length > 0 && (
              <>
                <h2 className="text-lg font-semibold mt-4">Users</h2>
                {searchResults.users.map((user) => (
                  <UserCard key={user.userId} user={user} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

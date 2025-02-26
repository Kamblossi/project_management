"use client";

import React, { useState } from "react";

type Props = {
    priority: Priority;
  };

  const ReusablePriorityPage = ({ priority }: Props) => {
    const [view, setView] = useState("list");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  
    const { data: currentUser } = useGetAuthUserQuery({});
    const userId = currentUser?.userDetails?.userId ?? null;
    const {
      data: tasks,
      isLoading,
      isError: isTasksError,
    } = useGetTasksByUserQuery(userId || 0, {
      skip: userId === null,
    });
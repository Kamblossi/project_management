"use client";

import { Priority, useGetTasksByUserQuery } from '@/state/api';
import React, { useState } from "react";

type Props = {
    priority: Priority;
};

const index = ({ priority }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, react-hooks/rules-of-hooks
    const [view, setView ] = useState("list");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    const { data: task, isLoading, isError: isTasksError} = useGetTasksByUserQuery(1 || 0, )

    return <div>index</div>;
};

export default index;
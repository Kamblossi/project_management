/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Priority, useGetTasksByUserQuery } from '@/state/api';
import React, { useState } from "react";

type Props = {
    priority: Priority;
};

const index = ({ priority }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, react-hooks/rules-of-hooks
    const [view, setView ] = useState("list");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: task, isLoading, isError: isTasksError} = useGetTasksByUserQuery(1 || 0, )

    return <div>index</div>;
};

export default index;
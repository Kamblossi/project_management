"use client";

import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import ModalNewTask from '@/components/ModalNewTask';
import TaskCard from '@/components/TaskCard';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { Priority, Task, useGetTasksByUserQuery } from '@/state/api';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from "react";

type Props = {
    priority: Priority;
};

const ReusablePriorityPage = ({ priority }: Props) => {
    const [view, setView] = useState("list");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  
    const userId = 1;
    const {
      data: tasks,
      isLoading,
      isError: isTasksError,
    } = useGetTasksByUserQuery(userId || 0, {
      skip: userId === null,
    });
  
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  
    const filteredTasks = tasks?.filter(
      (task: Task) => task.priority === priority,
    );
  
    if (isTasksError || !tasks) return <div>Error fetching tasks</div>;

    return (
        <div className="m-5 p-4">
          <ModalNewTask
            isOpen={isModalNewTaskOpen}
            onClose={() => setIsModalNewTaskOpen(false)}
          />
          <Header
            name="Priority Page"
            buttonComponent={
              <button
                className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={() => setIsModalNewTaskOpen(true)}
              >
                Add Task
              </button>
            }
          />
          <div className="mb-4 flex justify-start">
            <button
              className={`px-4 py-2 ${
                view === "list" ? "bg-gray-300" : "bg-white"
              } rounded-l`}
              onClick={() => setView("list")}
            >
              List
            </button>
            <button
              className={`px-4 py-2 ${
                view === "table" ? "bg-gray-300" : "bg-white"
              } rounded-l`}
              onClick={() => setView("table")}
            >
              Table
            </button>
          </div>
          {isLoading ? (
            <div>Loading tasks...</div>
          ) : view === "list" ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredTasks?.map((task: Task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            view === "table" &&
            filteredTasks && (
              <div className="z-0 w-full">
                <DataGrid
                  rows={filteredTasks}
                  columns={columns}
                  checkboxSelection
                  getRowId={(row) => row.id}
                  className={dataGridClassNames}
                  sx={dataGridSxStyles(isDarkMode)}
                />
              </div>
            )
          )}
        </div>
      );
    };

export default ReusablePriorityPage;
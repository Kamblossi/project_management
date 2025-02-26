"use client";

import {
  Priority,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/api";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/Header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const taskColumns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "priority", headerName: "Priority", width: 150 },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 150,
    valueFormatter: (params) =>
      params.value ? new Date(params.value).toISOString().split("T")[0] : "N/A",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
  const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    if (!projects || projects.length === 0) return;

    const interval = setInterval(() => {
      setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [projects]);

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const currentProject = projects?.[currentProjectIndex];
  const currentProjectId = currentProject?.id || 1;

  const { data: tasks, isLoading: tasksLoading, isError: tasksError } =
    useGetTasksQuery({ projectId: currentProjectId });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || isProjectsLoading) return <div>Loading..</div>;
  if (tasksError || !tasks || !projects) return <div>Error fetching data</div>;

  const taskStatusCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { status } = task;
      if (status) acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  const taskStatusData = Object.keys(taskStatusCount).map((key) => ({
    name: key,
    count: taskStatusCount[key],
  }));

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8 fade-in">
      <Header name={`Project Management Dashboard - ${currentProject?.name || "Loading..."}`} />
      
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevProject} className="bg-gray-500 text-white px-4 py-2 rounded">
          ← Previous Project
        </button>
        <h3 className="text-lg font-semibold dark:text-white">
          {currentProject?.name || "Loading..."}
        </h3>
        <button onClick={handleNextProject} className="bg-gray-500 text-white px-4 py-2 rounded">
          Next Project →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">Task Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="count" data={taskStatusData} label>
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

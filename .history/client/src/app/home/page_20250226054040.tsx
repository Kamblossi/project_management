"use client";

import {
  Priority,
  Project,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/api";
import React, { useState, useEffect, useMemo } from "react";
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
    width: 200, // Increased width to accommodate the formatted date
    valueFormatter: (params) => {
      if (!params.value) return "No due date"; // Handle null or undefined
      const date = new Date(params.value);
      if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date strings
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
  const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Auto-switch projects every 10 seconds
  useEffect(() => {
    if (!projects || projects.length === 0) return;

    const interval = setInterval(() => {
      setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 10000); // Change project every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [projects]);

  const currentProject = projects?.[currentProjectIndex] || null;
  const currentProjectId = currentProject?.id || 1; // Default to 1 if no projects

  const { data: tasks, isLoading: tasksLoading, isError: tasksError } =
    useGetTasksQuery({ projectId: currentProjectId });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || isProjectsLoading) return <div>Loading..</div>;
  if (tasksError || !tasks || !projects) return <div>Error fetching data</div>;

  // Count tasks by priority
  const priorityCount = useMemo(() => {
    return tasks.reduce<Record<Priority, number>>(
      (acc, task) => {
        const { priority } = task;
        acc[priority] = (acc[priority] || 0) + 1;
        return acc;
      },
      {} as Record<Priority, number>
    );
  }, [tasks]);

  const taskDistribution = useMemo(() => {
    return Object.keys(priorityCount).map((key) => ({
      name: key,
      count: priorityCount[key as Priority],
    }));
  }, [priorityCount]);

  // Count tasks by status
  const taskStatusCount = useMemo(() => {
    return tasks.reduce<Record<string, number>>(
      (acc, task) => {
        const { status } = task;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [tasks]);

  const taskStatusData = useMemo(() => {
    return Object.keys(taskStatusCount).map((key) => ({
      name: key,
      count: taskStatusCount[key],
    }));
  }, [taskStatusCount]);

  const chartColors = useMemo(() => {
    return isDarkMode
      ? {
          bar: "#8884d8",
          barGrid: "#303030",
          pieFill: "#4A90E2",
          text: "#FFFFFF",
        }
      : {
          bar: "#8884d8",
          barGrid: "#E0E0E0",
          pieFill: "#82ca9d",
          text: "#000000",
        };
  }, [isDarkMode]);

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
      <Header name={`Project Management Dashboard - ${currentProject?.name || "Loading..."}`} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Task Priority Distribution Chart */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution} aria-label="Task Priority Distribution Chart">
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.barGrid} />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip contentStyle={{ width: "min-content", height: "min-content" }} />
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Status Pie Chart */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Status Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="count" data={taskStatusData} label>
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Task List */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Tasks for {currentProject?.name || "Project"}
          </h3>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={tasksLoading}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
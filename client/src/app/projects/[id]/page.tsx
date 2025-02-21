"use client";

import React, { useEffect, useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import BoardView from "../BoardView";
import List from "../ListView";
import Timeline from "../Timeline";
import Table from "../TableView";
import ModalNewTask from "@/components/ModalNewTask"
import { useParams } from "next/navigation";

const Project = () => {
  const params = useParams(); // ✅ Use Next.js 14+ method to get params
  const [id, setId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  // ✅ Wait for `params.id` before setting state
  useEffect(() => {
    if (params?.id) {
      setId(params.id as string);
    }
  }, [params]);

  // ✅ Prevent rendering issues while waiting for `id`
  if (!id) return <div>Loading...</div>;

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;

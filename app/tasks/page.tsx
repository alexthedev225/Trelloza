"use client";
import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";

import TaskForm from "./TaskForm"; // Importation du sous-composant
import TaskList from "./TaskList"; // Importation du sous-composant
import TaskTip from "./TaskTip"; // Importation du sous-composant

interface Task {
  _id: number;
  content: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high">("all");

  const getToken = () => {
    return Cookies.get("token");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/api/tasks", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setTasks(data || []);
            console.log(tasks)
          } else {
            console.error("Failed to fetch tasks");
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-6 sm:p-10 min-h-screen">
      <div className="flex flex-col justify-center items-center mb-12 w-full">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center">
          Gestionnaire de Tâches
        </h1>
        <p className="mt-6 text-lg text-white text-center">
          Gérez vos tâches facilement et efficacement grâce à notre interface intuitive, où vous pouvez ajouter, modifier et suivre vos tâches en un clin d'œil.
        </p>
      </div>

      <TaskTip />

      <div className="mb-6 flex justify-end">
        <select
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value as "all" | "low" | "medium" | "high")}
        >
          <option value="all">Toutes</option>
          <option value="low">Priorité Basse</option>
          <option value="medium">Priorité Moyenne</option>
          <option value="high">Priorité Élevée</option>
        </select>
      </div>

      <TaskForm tasks={tasks} setTasks={setTasks} />

      <TaskList tasks={tasks} filterPriority={filterPriority} setTasks={setTasks} />
    </div>
  );
};

export default TasksPage;

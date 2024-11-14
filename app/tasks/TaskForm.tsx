import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { gsap } from "gsap";
import Cookies from "js-cookie";

interface Task {
  _id: string;
  content: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

interface TaskFormProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskForm: React.FC<TaskFormProps> = ({  setTasks }) => {
  const [taskContent, setTaskContent] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState("");

  const getToken = () => {
    return Cookies.get("token");
  };

  const handleAddTask = async () => {
    if (taskContent.trim()) {
      const newTask = {
        content: taskContent.trim(),
        completed: false,
        priority,
        dueDate: dueDate || "Pas de date limite",
      };

      const token = getToken();
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/api/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newTask),
          });

          if (response.ok) {
            const data = await response.json();
            // Ajoutez la nouvelle tâche à l'état immédiatement
            setTasks(prevTasks => [data.task, ...prevTasks]);
            setTaskContent("");
            setDueDate("");
            setPriority("low");

            gsap.fromTo(
              `.task-${data.task.id}`,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
          }
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
        rows={3}
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Écrivez votre tâche ici..."
      />
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-4">
          <label htmlFor="priority" className="font-medium">Priorité :</label>
          <select
            id="priority"
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            value={priority}
            onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
          >
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Élevée</option>
          </select>

          <label htmlFor="dueDate" className="font-medium">Date Limite :</label>
          <input
            type="date"
            id="dueDate"
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-pink-600"
          onClick={handleAddTask}
        >
          <PlusIcon className="w-5 h-5 mr-2" /> Ajouter une Tâche
        </button>
      </div>
    </div>
  );
};


export default TaskForm;

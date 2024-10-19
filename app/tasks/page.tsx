"use client";
import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { gsap } from "gsap";

interface Task {
  id: number;
  content: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskContent, setTaskContent] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [filterPriority, setFilterPriority] = useState<
    "all" | "low" | "medium" | "high"
  >("all");

  // Animation pour les boutons
  useEffect(() => {
    const buttons = document.querySelectorAll(".task-btn");
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.05, duration: 0.2 });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.2 });
      });
    });
  }, []);

  useEffect(() => {
    const storedTasks = localStorage.getItem("Tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskContent.trim()) {
      const newTask: Task = {
        id: Date.now(),
        content: taskContent.trim(),
        completed: false,
        priority,
        dueDate: dueDate || "Pas de date limite",
      };
      setTasks([newTask, ...tasks]);
      setTaskContent("");
      setDueDate("");
      setPriority("low");

      gsap.fromTo(
        `.task-${newTask.id}`,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  };

  const handleDeleteTask = (id: number) => {
    gsap.to(`.task-${id}`, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
      },
    });
  };

  const handleCompleteTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setShowEditModal(true);
  };

  const handleEditTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setShowEditModal(false);
  };

  const renderTaskPriority = (priority: "low" | "medium" | "high") => {
    if (priority === "high") return "bg-red-500";
    if (priority === "medium") return "bg-yellow-500";
    return "bg-green-500";
  };

  const filteredTasks = tasks.filter(
    (task) => filterPriority === "all" || task.priority === filterPriority
  );

  return (
    <div className="container mx-auto p-6 sm:p-10 min-h-screen">
      <div className="flex flex-col justify-center items-center mb-12 w-full">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center playfair-display">
          Gestionnaire de Tâches
        </h1>
        <p className="mt-6 text-lg text-white text-center">
          Gérez vos tâches facilement et efficacement grâce à notre interface intuitive, où vous pouvez ajouter, modifier et suivre vos tâches en un clin d'œil.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 shadow-2xl">
        <p className="text-2xl text-gray-800 flex items-center">
          💡 <strong className="ml-2">Astuce</strong>
        </p>
        <div className="text-gray-700 mt-2">
          <p className="text-lg text-gray-700 mt-2">
            Pour mieux organiser vos tâches, vous pouvez utiliser les fonctionnalités suivantes :
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>📅 <strong>Échéance :</strong> Définissez des dates limites pour garder vos tâches sur la bonne voie.</li>
            <li>🔄 <strong>Modifier :</strong> Cliquez sur l'icône en forme de crayon pour mettre à jour le contenu d'une tâche à tout moment.</li>
            <li>🗑️ <strong>Supprimer :</strong> Utilisez l'icône en forme de poubelle pour supprimer les tâches dont vous n'avez plus besoin.</li>
            <li>✔️ <strong>Compléter :</strong> Cochez les tâches lorsque vous les avez terminées pour garder une trace de vos progrès.</li>
          </ul>
        </div>
      </div>

      {/* Filtre de tâches */}
      <div className="mb-6 flex justify-end">
        <select
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          value={filterPriority}
          onChange={(e) =>
            setFilterPriority(e.target.value as "all" | "low" | "medium" | "high")
          }
        >
          <option value="all">Toutes</option>
          <option value="low">Priorité Basse</option>
          <option value="medium">Priorité Moyenne</option>
          <option value="high">Priorité Élevée</option>
        </select>
      </div>

      {/* Création de tâches */}
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
            <label htmlFor="priority" className="font-medium">
              Priorité :
            </label>
            <select
              id="priority"
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "low" | "medium" | "high")
              }
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
            </select>

            <label htmlFor="dueDate" className="font-medium">
              Date Limite :
            </label>
            <input
              type="date"
              id="dueDate"
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2 bg-pink-500 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-pink-600 task-btn"
            onClick={handleAddTask}
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Ajouter une Tâche
          </button>
        </div>
        <div className="flex mt-2 items-center text-sm text-gray-600">
          <InformationCircleIcon className="w-5 h-5 mr-1" />
          <p>💡 Vous pouvez prioriser les tâches et définir des dates limites pour gérer votre temps efficacement.</p>
        </div>
      </div>

      {/* Listes de tâches */}
      <div>
        {tasks.length === 0 ? (
          <p className="text-white text-center">
            Pas de tâches disponibles. Commencez par ajouter une nouvelle tâche.
          </p>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Tâches En Attente</h2>
            <ul className="space-y-4">
              {filteredTasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <li
                    key={task.id}
                    className={`task-${task.id} p-4 bg-white rounded-lg shadow-md flex justify-between items-center transition duration-300 transform hover:shadow-lg`}
                  >
                    <div className="flex items-center space-x-4">
                      <button
                        className={`p-2 rounded-full ${renderTaskPriority(
                          task.priority
                        )}`}
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        {task.completed ? (
                          <CheckCircleIcon className="w-5 h-5 text-white" />
                        ) : (
                          ""
                        )}
                      </button>
                      <div className="text-left">
                        <span className="text-lg font-semibold">
                          {task.content}
                        </span>
                        <p className="text-sm text-gray-500">
                          Date Limite : {task.dueDate}
                        </p>
                      </div>
                      <span
  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
    task.priority === "high"
      ? "bg-red-200 text-red-800"
      : task.priority === "medium"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-green-200 text-green-800"
  }`}
>
Priorité {task.priority === "low" ? "basse" : task.priority === "medium" ? "moyenne" : "élevée"} 
</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 bg-yellow-500 text-white rounded-full transition-all duration-300 hover:bg-yellow-600 task-btn"
                        onClick={() => openEditModal(task)}
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 bg-red-500 text-white rounded-full transition-all duration-300 hover:bg-red-600 task-btn"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>

            {/* Section des Tâches Complétées */}
            <h2 className="text-xl font-bold mb-4 text-white mt-8">Tâches Complétées</h2>
            <ul className="space-y-4">
              {filteredTasks
                .filter((task) => task.completed)
                .map((task) => (
                  <li
                    key={task.id}
                    className={`task-${task.id} p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center transition duration-300 transform`}
                  >
                    <div className="flex items-center space-x-4">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <div className="text-left">
                        <span className="text-lg font-semibold line-through text-gray-500">
                          {task.content}
                        </span>
                        <p className="text-sm text-gray-500">
                          Date Limite : {task.dueDate}
                        </p>
                      </div>
                      <span
  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
    task.priority === "high"
      ? "bg-red-200 text-red-800"
      : task.priority === "medium"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-green-200 text-green-800"
  }`}
>
Priorité {task.priority === "low" ? "basse" : task.priority === "medium" ? "moyenne" : "élevée"} 
</span>

                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 bg-red-500 text-white rounded-full transition-all duration-300 hover:bg-red-600 task-btn"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;

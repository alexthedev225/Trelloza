import React, { useState } from "react";
import {
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { gsap } from "gsap";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Task {
  _id: string; // Utilisez string pour l'identifiant, car Mongoose génère des identifiants de type ObjectId.
  content: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

interface TaskListProps {
  tasks: Task[];
  filterPriority: "all" | "low" | "medium" | "high";
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filterPriority,
  setTasks,
}) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // Pour savoir quelle tâche est en cours d'édition
  const [editedContent, setEditedContent] = useState<string>(""); // Pour stocker le nouveau contenu

  const startEditingTask = (task: Task) => {
    setEditingTaskId(task._id); // Définit la tâche en cours d'édition
    setEditedContent(task.content); // Prend le contenu actuel comme valeur initiale
  };

  const translatePriority = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return "Basse";
      case "medium":
        return "Moyenne";
      case "high":
        return "Élevée";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterPriority === "all") return true;
    return task.priority === filterPriority;
  });

  const getToken = () => {
    return Cookies.get("token"); // Récupération du token
  };

  const handleDeleteTask = async (id: string) => {
    const token = getToken();
    if (token) {
      try {
        const response = await fetch(`/api/tasks/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          gsap.to(`.task-${id}`, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => {
              const updatedTasks = tasks.filter((task) => task._id !== id);
              setTasks(updatedTasks);
            },
          });
        } else {
          console.error("Failed to delete task:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleCompleteTask = async (task: Task) => {
    const token = getToken();
    if (token) {
      try {
        const response = await fetch(`/api/tasks/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...task, completed: !task.completed }),
        });

        if (response.ok) {
          const updatedTask = await response.json();
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
          );
        } else {
          console.error("Failed to update task:", await response.text());
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const saveEditedTask = async (task: Task) => {
    const token = getToken();
    if (token) {
      try {
        const response = await fetch(`/api/tasks/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...task, content: editedContent }),
        });

        if (response.ok) {
          const updatedTask = await response.json();
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
          );
          setEditingTaskId(null); // Fin du mode édition
        } else {
          console.error("Failed to save task:", await response.text());
        }
      } catch (error) {
        console.error("Error saving task:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      {filteredTasks.length === 0 ? (
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
                  key={task._id}
                  className={`task-${task._id} p-4 bg-white rounded-lg shadow-md flex justify-between items-center transition duration-300 transform hover:shadow-lg`}
                >
                  <div className="flex items-center space-x-4">
                    <button
                      className={`p-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`}
                      onClick={() => handleCompleteTask(task)}
                      title="Marquer comme complétée"
                    >
                      {task.completed ? (
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      ) : (
                        ""
                      )}
                    </button>
                    <div className="text-left">
                      {editingTaskId === task._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                          />
                          <button
                            onClick={() => saveEditedTask(task)}
                            className="ml-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Sauvegarder
                          </button>
                          <button
                            onClick={() => setEditingTaskId(null)}
                            className="ml-2 p-1 text-red-500 hover:text-red-600"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <span className="text-lg font-semibold">
                            {task.content}
                          </span>
                          <p className="text-sm text-gray-500">
                            Date Limite : {formatDate(task.dueDate)}
                          </p>
                        </div>
                      )}
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          task.priority === "high"
                            ? "bg-red-200 text-red-800"
                            : task.priority === "medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        Priorité {translatePriority(task.priority)} 
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 bg-yellow-500 text-white rounded-full transition-all duration-300 hover:bg-yellow-600"
                      onClick={() => startEditingTask(task)}
                      title="Modifier la tâche"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded-full transition-all duration-300 hover:bg-red-600"
                      onClick={() => handleDeleteTask(task._id)}
                      title="Supprimer la tâche"
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
                  key={task._id}
                  className={`task-${task._id} p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center transition duration-300 transform`}
                >
                  <div className="flex items-center space-x-4">
                    <button
                      className="p-2 bg-green-500 rounded-full"
                      onClick={() => handleCompleteTask(task)}
                      title="Marquer comme non complétée"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-white" />
                    </button>
                    <div className="text-left">
                      <span className="text-lg font-semibold line-through">
                        {task.content}
                      </span>
                      <p className="text-sm text-gray-500">
                        Date Limite : {formatDate(task.dueDate)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-2 bg-red-500 text-white rounded-full transition-all duration-300 hover:bg-red-600"
                    onClick={() => handleDeleteTask(task._id)}
                    title="Supprimer la tâche"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskList;

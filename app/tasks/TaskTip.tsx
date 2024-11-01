import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const TaskTip: React.FC = () => {
  return (
    <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg flex items-center">
      <InformationCircleIcon className="w-6 h-6 text-blue-500 mr-2" />
      <span className="text-blue-700">
        Pour une gestion optimale de vos tâches, utilisez les priorités et les
        dates limites ! 💪
      </span>
    </div>
  );
};

export default TaskTip;

import React from "react";
import { Squares2X2Icon, Bars3Icon } from "@heroicons/react/24/outline";

interface ViewModeToggleProps {
  viewMode: "list" | "grid";
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "grid">>;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        className={`p-2 ${viewMode === "list" ? "bg-pink-500 text-white" : "text-gray-500"} transition-all duration-300 rounded-full hover:bg-pink-500 hover:text-white`}
        onClick={() => setViewMode("list")}
      >
        <Bars3Icon className="w-6 h-6" />
      </button>
      <button
        className={`p-2 ml-2 ${viewMode === "grid" ? "bg-pink-500 text-white" : "text-gray-500"} transition-all duration-300 rounded-full hover:bg-pink-500 hover:text-white`}
        onClick={() => setViewMode("grid")}
      >
        <Squares2X2Icon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ViewModeToggle;

import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Instructions: React.FC = () => (
  <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg flex items-center">
    <InformationCircleIcon className="w-6 h-6 text-blue-500 mr-2" />
    <p className="text-blue-700 flex items-center ">
      Pour ajouter un événement, choisissez une date, un titre et une couleur !
      😊
    </p>
  </div>
);

export default Instructions;

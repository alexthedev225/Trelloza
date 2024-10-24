import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Instructions: React.FC = () => {
  return (
    <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg flex items-center">
      <InformationCircleIcon className="w-6 h-6 text-blue-500 mr-2" />
      <span className="text-blue-700">
        Sélectionnez un jour, entrez un titre, choisissez une couleur, puis cliquez sur "Ajouter". Pour tout supprimer, utilisez "Supprimer tous".
      </span>
    </div>
  );
};

export default Instructions;

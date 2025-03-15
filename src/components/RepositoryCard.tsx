import React from "react";

interface RepositoryCardProps {
  repo: {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
  };
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {
  return (
    <div className="border p-2 rounded mb-2 shadow-sm relative">
      {/* Repository Title & Description */}
      <h4 className="font-bold truncate max-w-[80%]">{repo.name}</h4>
      <p className="text-sm text-gray-600">{repo.description || "No description"}</p>

      {/* Star Count (Top Right Corner) */}
      <div className="absolute top-2 right-2 flex items-center gap-1 text-gray-700 text-sm">
        <span className="text-yellow-500">★</span>
        {repo.stargazers_count}
      </div>
    </div>
  );
};

export default RepositoryCard;

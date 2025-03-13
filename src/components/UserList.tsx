import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos } from "../store/slices/userSlice";
import { RootState, AppDispatch } from "../store/store";

interface UserListProps {
  users: { login: string; avatar_url: string }[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openUser, setOpenUser] = useState<string | null>(null);
  const repos = useSelector((state: RootState) => state.users.repos);

  const toggleAccordion = (username: string) => {
    if (openUser === username) {
      setOpenUser(null);
    } else {
      setOpenUser(username);
      if (!repos[username]) {
        dispatch(fetchRepos(username));
      }
    }
  };

  return (
    <div className="mt-4">
      {users.map((user) => (
        <div key={user.login} className="border rounded-md mb-2">
          <button
            className="w-full flex justify-between items-center p-4 bg-gray-100"
            onClick={() => toggleAccordion(user.login)}
          >
            <div className="flex items-center gap-2">
              <img src={user.avatar_url} alt={user.login} className="w-8 h-8 rounded-full" />
              <span className="font-bold">{user.login}</span>
            </div>
            <span>{openUser === user.login ? "▲" : "▼"}</span>
          </button>

          {openUser === user.login && (
            <div className="p-4 bg-white">
              <h3 className="font-semibold mb-2">Repositories:</h3>
              {repos[user.login] ? (
                repos[user.login].length > 0 ? (
                  repos[user.login].map((repo) => (
                    <div key={repo.id} className="border p-2 rounded mb-2 shadow-sm relative">
                      {/* Repository Title & Description */}
                      <h4 className="font-bold">{repo.name}</h4>
                      <p className="text-sm text-gray-600">{repo.description || "No description"}</p>

                      {/* Star Count (Top Right Corner) */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-gray-700 text-sm">
                        {repo.stargazers_count}
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No repositories found.</p>
                )
              ) : (
                <p>Loading repositories...</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;

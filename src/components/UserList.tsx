import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos } from "../store/slices/userSlice";
import { RootState, AppDispatch } from "../store/store";
import RepositoryCard from "./RepositoryCard";

interface UserListProps {
  users: { login: string; avatar_url: string }[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openUser, setOpenUser] = useState<string | null>(null);
  const repos = useSelector((state: RootState) => state.users.repos);

  const toggleAccordion = (username: string) => {
    setOpenUser(openUser === username ? null : username);
    if (!repos[username]) {
      dispatch(fetchRepos(username));
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
                    <RepositoryCard key={repo.id} repo={repo} />
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

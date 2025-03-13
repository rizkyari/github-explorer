import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRepos } from "../store/slices/userSlice";
import { RootState, AppDispatch } from "../store/store";

const UserDetail = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const repos = useSelector((state: RootState) => username ? state.users.repos[username] || [] : []);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      dispatch(fetchRepos(username));
    }
  }, [dispatch, username]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border">
      <button className="bg-gray-500 text-white p-2 rounded mb-4" onClick={() => navigate("/")}>
        Go Back
      </button>
      <h2 className="text-xl font-bold">{username}'s Repositories</h2>
      {repos ? (
        repos.map((repo: any) => (
          <div key={repo.id} className="border p-2 my-2 bg-white">
            <h3 className="font-bold">{repo.name}</h3>
            <p>{repo.description || "No description available"}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetail;

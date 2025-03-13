import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/userSlice";
import { RootState, AppDispatch } from "../store/store";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";

const Home = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchUsers(query));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border">
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <UserList users={users} />
    </div>
  );
};

export default Home;

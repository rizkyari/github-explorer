import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  login: string;
  id: number;
  avatar_url: string;
}

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

interface UserState {
  users: User[];
  repos: Record<string, Repo[]>;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  users: [],
  repos: {},
  status: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (query: string) => {
  const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=5`);
  return response.data.items;
});

export const fetchRepos = createAsyncThunk("users/fetchRepos", async (username: string) => {
  const response = await axios.get(`https://api.github.com/users/${username}/repos`);
  return { username, repos: response.data };
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      })

      // Fetch Repos
      .addCase(fetchRepos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRepos.fulfilled, (state, action: PayloadAction<{ username: string; repos: Repo[] }>) => {
        state.status = "idle";
        state.repos[action.payload.username] = action.payload.repos;
      })
      .addCase(fetchRepos.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
import axios from "axios";
import { handleApiError } from "./apiUtils";

// Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_GITHUB_API;

// Fetch GitHub users based on search query
export const fetchGitHubUsers = async (query: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search/users?q=${query}&per_page=5`);
        return response.data.items;
    } catch (error) {
        handleApiError(error);
    }
  };

// Fetch repositories of a specific user
export const fetchGitHubRepos = async (username: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${username}/repos`);
      return response.data.length ? response.data : [];
    } catch (error) {
      handleApiError(error);
      return [];
    }
};

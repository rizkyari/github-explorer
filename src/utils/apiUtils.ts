export const handleApiError = (error: any): never => {
    console.error("API Error:", error);
  
    if (error.response) {
      switch (error.response.status) {
        case 403:
          throw new Error("GitHub API rate limit exceeded. Please try again later.");
        case 404:
          throw new Error("No users found.");
        case 500:
          throw new Error("GitHub server error. Please try again later.");
        default:
          throw new Error(error.response.data?.message || "An unknown error occurred.");
      }
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  };
  
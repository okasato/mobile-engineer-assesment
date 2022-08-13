import axios from "axios";

export const getGitPublicRepositories = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    if (response.status === 200) {
      return response?.data ? response.data : [];
    }
  } catch (error) {
    return [
      {
        error: {
          status: error.status,
          message: error.message,
          name: error.name,
        },
      },
    ];
  }
};

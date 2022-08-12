import axios from "axios";

export const getGitPublicRepositories = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    if (response) {
      return response?.data ? response.data : [];
    }
  } catch (error) {}
};

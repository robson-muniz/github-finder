export const fetchGithubUsers = async (username: string) => {
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  const data = await response.json();
  return data;

}

export const searchGithubUsers = async (query: string) => {
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  const data = await response.json();
  return data.items;

}
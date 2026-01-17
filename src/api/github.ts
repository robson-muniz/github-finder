export const fetchGithubUsers = async (username: string) => {
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();      
      return data;
    
}
/**
 * Fetches detailed information for a specific GitHub user.
 * 
 * @param {string} username - The GitHub username to look up
 * @returns {Promise<any>} - The user data from GitHub API
 * @throws {Error} - If the response is not ok (e.g., 404 User Not Found)
 */
export const fetchGithubUsers = async (username: string) => {
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`);

  if (!response.ok) {
    // In a production app, we might want to parse the error body for more specific messages
    throw new Error('Failed to fetch user data');
  }
  const data = await response.json();
  return data;
}

/**
 * Searches for GitHub users matching a query string.
 * Used for the autocomplete/suggestion feature.
 * 
 * @param {string} query - The partial username to search for
 * @returns {Promise<any[]>} - An array of matching user items
 */
export const searchGithubUsers = async (query: string) => {
  // Determine if we are using the real API or a mock based on environment or implementation details
  // Note: GitHub Search API has a stricter rate limit for unauthenticated requests
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  const data = await response.json();
  // The search endpoint returns an object with an 'items' array
  return data.items;

}

export const checkIfFollowingUser = async (username: string) => {
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (response.status === 204) {
    return true;
  } else if (response.status === 404) {
    return false;
  } else {
    // If we're unauthorized or have other errors, we might want to return false or throw
    // For now, let's treat other errors as "not following" but log it, 
    // or arguably throwing is better to debug permissions.
    console.error(`Failed to check follow status: ${response.status}`);
    throw new Error(`Failed to check follow status: ${response.status}`);
  }
}

export const followUser = async (username: string) => {
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Length': '0', // Required for some PUT requests with empty body
    },
  });

  if (response.status !== 204) {
    throw new Error(`Failed to follow user: ${response.status}`);
  }
  return true;
}

export const unfollowUser = async (username: string) => {
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (response.status !== 204) {
    throw new Error(`Failed to unfollow user: ${response.status}`);
  }
  return true;
}
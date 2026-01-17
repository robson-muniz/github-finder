import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaGithubAlt } from "react-icons/fa";

interface UserSearchProps {
  searchUsers: (text: string) => void;
}

const UserSearch = ({ searchUsers }: UserSearchProps) => {

  const [username, setUsername] = useState('');
  const [submitUsername, setSubmitUsername] = useState('');

 const {data, isLoading, isError,error} = useQuery(
  {
    queryKey: ['users', submitUsername],
    queryFn: async () => {
      if (!submitUsername) return null;
      const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${submitUsername}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      console.log(data);
      return data;
    },
    enabled: !!submitUsername
  }
 )

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitUsername(username.trim());
  searchUsers(username.trim());
 }

  return (
    <div>
      User Search
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Enter GitHub username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          setSubmitUsername(username);
        }}>Search</button>
      </form>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      
      {data && (
        <div className="user-profile">
          <img src={data.avatar_url} alt={data.login} style={{width: '100px', borderRadius: '50%'}} />
          <h3>{data.login}</h3>
          <p>{data.bio}</p>
          <a 
          href={data.html_url}
          className="profile-btn"
          target="_blank" 
          rel="noopener noreferrer">
            <FaGithubAlt />View Profile
            </a>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
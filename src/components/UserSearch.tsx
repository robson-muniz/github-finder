import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGithubUsers } from "../api/github";
import UserCard from "./UserCard";

interface UserSearchProps {
  searchUsers: (text: string) => void;
}

const UserSearch = ({ searchUsers }: UserSearchProps) => {

  const [username, setUsername] = useState('');
  const [submitUsername, setSubmitUsername] = useState('');

 const {data, isLoading, isError,error} = useQuery(
  {
    queryKey: ['users', submitUsername],
    queryFn: () => fetchGithubUsers(submitUsername),
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
      
      {data && <UserCard user={data} />}
    </div>
  );
};

export default UserSearch;
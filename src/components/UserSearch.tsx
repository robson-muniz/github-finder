import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGithubUsers } from "../api/github";
import UserCard from "./UserCard";
import RecentSearches from "./RecentSearches";

interface UserSearchProps {
  searchUsers: (text: string) => void;
}

const UserSearch = ({ searchUsers }: UserSearchProps) => {
  const [username, setUsername] = useState('');
  const [submitUsername, setSubmitUsername] = useState('');
  const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    const stored = localStorage.getItem('recentUsers');
    return stored ? JSON.parse(stored) : [];
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', submitUsername],
    queryFn: () => fetchGithubUsers(submitUsername),
    enabled: !!submitUsername
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;

    setSubmitUsername(trimmed);
    searchUsers(trimmed);

    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((user) => user !== trimmed)];
      return updated.slice(0, 5);
    });
  };

  useEffect(() => {
    localStorage.setItem('recentUsers', JSON.stringify(recentUsers));
  }, [recentUsers]);

  return (
    <div>
      User Search
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {(error as Error).message}</div>}

      {data && <UserCard user={data} />}

      {recentUsers.length > 0 && (
        <RecentSearches users={recentUsers}
          onSelect={(username) => {
            setUsername(username);
            setSubmitUsername(username);
          }} />
      )}

    </div>
  );
};

export default UserSearch;

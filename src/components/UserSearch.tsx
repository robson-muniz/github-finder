import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGithubUsers, searchGithubUsers } from "../api/github";
import UserCard from "./UserCard";
import RecentSearches from "./RecentSearches";
import { useDebounce } from "../hooks/useDebounce";
import type { GithubUser } from "../types";

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

  const [debouncedUsername] = useDebounce(username, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users', submitUsername],
    queryFn: () => fetchGithubUsers(submitUsername),
    enabled: !!submitUsername
  });

  const { data: suggestions } = useQuery({
    queryKey: ['github-users-sugestions', debouncedUsername],
    queryFn: () => searchGithubUsers(debouncedUsername),
    enabled: debouncedUsername.length > 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;

    setSubmitUsername(trimmed);
    searchUsers('');

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
        <div className="dropdown-wrapper">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => {
              const value = e.target.value;
              setUsername(value);
              setShowSuggestions(value.trim().length > 1);
            }}
          />

          {showSuggestions && suggestions && suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.slice(0, 5).map((user) => (
                <li key={user.login}
                  onClick={() => {
                    setUsername(user.login);
                    setShowSuggestions(false);

                    if (submitUsername !== user.login) {
                      setSubmitUsername(user.login);
                    } else {
                      refetch();
                    }
                  }}
                >
                  <img src={user.avatar_url} alt={user.login} className="avatar-xs" />
                  {user.login}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit">Search</button>
      </form >

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {(error as Error).message}</div>}

      {data && <UserCard user={data} />}

      {
        recentUsers.length > 0 && (
          <RecentSearches users={recentUsers}
            onSelect={(username) => {
              setUsername(username);
              setSubmitUsername(username);
            }} />
        )
      }

    </div >
  );
};

export default UserSearch;

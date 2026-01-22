import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGithubUsers, searchGithubUsers } from "../api/github";
import UserCard from "./UserCard";
import UserCardSkeleton from "./UserCardSkeleton";
import RecentSearches from "./RecentSearches";

import { useDebounce } from "../hooks/useDebounce";

import SuggestionDropDown from "./SuggestionDropDown";
import { FaSearch, FaExclamationTriangle } from "react-icons/fa";

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
    <div className="user-search-container">


      <form onSubmit={handleSubmit} className="form">
        <div className="dropdown-wrapper">
          <input
            type="text"
            placeholder="Enter GitHub username (e.g., octocat)"
            value={username}
            onChange={(e) => {
              const value = e.target.value;
              setUsername(value);
              setShowSuggestions(value.trim().length > 1);
            }}
            aria-label="GitHub username"
          />

          <AnimatePresence>
            {showSuggestions && suggestions && suggestions.length > 0 && (
              <SuggestionDropDown
                suggestions={suggestions}
                show={showSuggestions}
                onSelect={(selected) => {
                  setUsername(selected);
                  setShowSuggestions(false);

                  if (submitUsername !== selected) {
                    setSubmitUsername(selected);
                  } else {
                    refetch();
                  }

                  setRecentUsers((prev) => {
                    const updated = [selected, ...prev.filter((user) => user !== selected)];
                    return updated.slice(0, 5);
                  });
                }}
              />
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSearch /> Search
        </motion.button>
      </form>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UserCardSkeleton />
          </motion.div>
        )}

        {isError && (
          <motion.div
            className="error-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <FaExclamationTriangle />
            <p>Error: {(error as Error).message}</p>
          </motion.div>
        )}

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UserCard user={data} />
          </motion.div>
        )}
      </AnimatePresence>

      {recentUsers.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <RecentSearches
            users={recentUsers}
            onSelect={(username) => {
              setUsername(username);
              setSubmitUsername(username);
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default UserSearch;
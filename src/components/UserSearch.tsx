import { useEffect, useState } from "react";
import { toast } from "sonner";
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
  // Callback (optional in current implementation but good for lifting state if needed)
  searchUsers: (text: string) => void;
}

const UserSearch = ({ searchUsers }: UserSearchProps) => {
  // State for the input field value
  const [username, setUsername] = useState('');
  // State for the value actively being searched (triggers the main query)
  // We separate this from 'username' to avoid triggering a full fetch on every keystroke
  const [submitUsername, setSubmitUsername] = useState('');

  // Persist recent searches in local storage
  const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    const stored = localStorage.getItem('recentUsers');
    return stored ? JSON.parse(stored) : [];
  });

  // Debounce the input to avoid hitting the search suggestions API too frequently
  const [debouncedUsername] = useDebounce(username, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Main query: Fetches full user details when 'submitUsername' changes
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users', submitUsername],
    queryFn: () => fetchGithubUsers(submitUsername),
    enabled: !!submitUsername, // Only run query if we have a username to submit
    retry: false, // Don't retry on 404s immediately
  });

  // Suggestions query: Fetches list of users as you type (debounced)
  const { data: suggestions } = useQuery({
    queryKey: ['github-users-sugestions', debouncedUsername],
    queryFn: () => searchGithubUsers(debouncedUsername),
    enabled: debouncedUsername.length > 1 // Only search if we have meaningful input
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;

    // Trigger the main search
    setSubmitUsername(trimmed);
    searchUsers(''); // Notify parent if needed

    // Update recent searches logic: FIFO (First In First Out) queue of size 5
    // Also moves duplicate searches to the top
    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((user) => user !== trimmed)];
      return updated.slice(0, 5);
    });
  };

  // Sync recent users with localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('recentUsers', JSON.stringify(recentUsers));
  }, [recentUsers]);


  // Toast notifications for search results
  useEffect(() => {
    if (isError && error) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

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
                  // User selected a suggestion
                  setUsername(selected);
                  setShowSuggestions(false);

                  // If selecting a different user, trigger new search; otherwise just refetch
                  if (submitUsername !== selected) {
                    setSubmitUsername(selected);
                  } else {
                    refetch();
                  }

                  // Update recent history immediately on selection
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
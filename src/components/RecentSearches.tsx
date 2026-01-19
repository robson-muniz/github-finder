
import { FaClock, FaUser } from "react-icons/fa6";
import { fetchGithubUsers } from "../api/github";
import { useQueryClient } from "@tanstack/react-query";

type RecentSearchesProps = {
  users: string[];
  onSelect: (user: string) => void;
}

const RecentSearches = ({ users, onSelect }: RecentSearchesProps) => {
  const queryClient = useQueryClient();

  return (
    <div className="recent-searches">
      <div className="recent-header">
        <FaClock />
        <h3>Recent Users</h3>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <button
              onClick={() => onSelect(user)}
              onMouseEnter={() => {
                queryClient.prefetchQuery({
                  queryKey: ["user", user],
                  queryFn: () => fetchGithubUsers(user),
                });
              }}
            >
              <FaUser className="user-icon" />
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div >
  );
};

export default RecentSearches;
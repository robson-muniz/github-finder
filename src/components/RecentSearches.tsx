import { FaClock, FaUser } from "react-icons/fa6";

type RecentSearchesProps = {
    users: string[];
    onSelect: (user: string) => void;
}

const RecentSearches = ({users, onSelect}: {users: string[], onSelect: (user: string) => void}) => {
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
                onClick={() => {
                  onSelect(user);
                }}
                >
                  <FaUser className="user-icon"/>
                  {user}
                  </button>
              </li>
            ))}
          </ul>
        </div>   
  );
};

export default RecentSearches;
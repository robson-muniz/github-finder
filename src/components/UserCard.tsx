import { FaGithubAlt } from "react-icons/fa6";
import type { GithubUser } from "../types";


const UserCard = ({user}: {user: GithubUser}) => {
  return (
    <div className="user-profile">
          <img src={user.avatar_url} alt={user.login} style={{width: '100px', borderRadius: '50%'}} />
          <h3>{user.login}</h3>
          <p>{user.bio}</p>
          <a 
          href={user.html_url}
          className="profile-btn"
          target="_blank" 
          rel="noopener noreferrer">
            <FaGithubAlt />View Profile
            </a>
        </div>
  );
};

export default UserCard;
import { FaGithubAlt, FaUsers, FaCode, FaStar, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import type { GithubUser } from "../types";

const UserCard = ({ user }: { user: GithubUser }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      className="user-profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="user-header">
        <motion.img
          src={user.avatar_url}
          alt={user.login}
          className="user-avatar"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <div className="user-info">
          <h3>{user.name || user.login}</h3>
          <p className="username">@{user.login}</p>
          {user.bio && <p className="user-bio">{user.bio}</p>}
        </div>
      </div>

      <div className="user-stats">
        <div className="stat-item">
          <FaCode className="stat-icon" />
          <span className="stat-value">{user.public_repos}</span>
          <span className="stat-label">Repos</span>
        </div>
        <div className="stat-item">
          <FaUsers className="stat-icon" />
          <span className="stat-value">{user.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <FaStar className="stat-icon" />
          <span className="stat-value">{user.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      <div className="user-details">
        {user.location && (
          <div className="detail-item">
            <FaMapMarkerAlt />
            <span>{user.location}</span>
          </div>
        )}
        <div className="detail-item">
          <FaCalendarAlt />
          <span>Joined {formatDate(user.created_at)}</span>
        </div>
      </div>

      <motion.a
        href={user.html_url}
        className="profile-btn"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaGithubAlt /> View Profile on GitHub
      </motion.a>
    </motion.div>
  );
};

export default UserCard;
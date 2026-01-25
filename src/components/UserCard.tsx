import { FaGithubAlt, FaUsers, FaCode, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { GithubUser } from "../types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkIfFollowingUser, followUser, unfollowUser } from "../api/github";

const UserCard = ({ user }: { user: GithubUser }) => {

  const { data: isFollowing } = useQuery({
    queryKey: ["follow-status", user.login],
    queryFn: () => checkIfFollowingUser(user.login),
    enabled: !!user.login,
  })

  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: () => followUser(user.login),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follow-status", user.login] });
      toast.success(`You are now following ${user.login}`);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(user.login),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follow-status", user.login] });
      toast.success(`You have unfollowed ${user.login}`);
    },
  });

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };



  // Helper to format ISO dates to a more readable US format (e.g., Dec 25, 2023)
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

      <div className="user-card-buttons">
        <button
          className={`follow-btn ${isFollowing ? 'following' : ''}`}
          onClick={handleFollowToggle}
          disabled={followMutation.isPending || unfollowMutation.isPending}
        >
          {isFollowing ? (
            <>
              <FaUserMinus className="follow-icon" /> Following
            </>
          ) : (
            <>
              <FaUserPlus className="follow-icon" /> Follow User
            </>
          )}
        </button>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-btn"
        >
          <FaGithubAlt /> View Profile on GitHub
        </a>
      </div>
    </motion.div>
  );
};

export default UserCard;
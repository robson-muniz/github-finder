import { motion } from "framer-motion";

const UserCardSkeleton = () => {
  return (
    <motion.div
      className="user-card-skeleton"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="skeleton-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-user-info">
          <div className="skeleton-name"></div>
          <div className="skeleton-username"></div>
        </div>
      </div>
      <div className="skeleton-stats">
        <div className="skeleton-stat"></div>
        <div className="skeleton-stat"></div>
        <div className="skeleton-stat"></div>
      </div>
      <div className="skeleton-details">
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
      </div>
      <div className="skeleton-button"></div>
    </motion.div>
  );
};

export default UserCardSkeleton;
import { motion } from "framer-motion";
import UserSearch from './components/UserSearch';

const App = () => {
  const searchUsers = (text: string) => {
    console.log('Searching for:', text);
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.header
            className="app-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1
              className="app-title"
              whileHover={{ scale: 1.02 }}
            >
              <span className="github-icon">🐙</span>
              GitHub Finder
            </motion.h1>
            <p className="app-subtitle">Discover developers and their amazing work</p>
          </motion.header>

          <UserSearch searchUsers={searchUsers} />
        </motion.div>
      </div>

      <motion.footer
        className="app-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="footer-content">
          <p>
            Made with <span className="heart">❤️</span> and a lot of
            <span className="coffee"> ☕</span> by
            <strong> Robson Muniz</strong> in Portugal
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default App;
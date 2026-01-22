import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { GithubUser } from "../types";

type SuggestionDropDownProps = {
  suggestions: GithubUser[];
  show: boolean;
  onSelect: (username: string) => void;
}

const SuggestionDropDown = ({ suggestions, show, onSelect }: SuggestionDropDownProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!show || !suggestions || suggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev =>
            prev < Math.min(suggestions.length - 1, 4) ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev =>
            prev > 0 ? prev - 1 : Math.min(suggestions.length - 1, 4)
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (suggestions[selectedIndex]) {
            onSelect(suggestions[selectedIndex].login);
          }
          break;
        case 'Escape':
          setSelectedIndex(0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, suggestions, onSelect, selectedIndex]);

  // Auto-scroll to selected item
  useEffect(() => {
    if (dropdownRef.current && selectedIndex >= 0) {
      const items = dropdownRef.current.children;
      if (items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  if (!show || !suggestions || suggestions.length === 0) return null;

  return (
    <motion.ul
      ref={dropdownRef}
      className="suggestions"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {suggestions.slice(0, 5).map((user, index) => (
        <motion.li
          key={user.login}
          onClick={() => onSelect(user.login)}
          onMouseEnter={() => setSelectedIndex(index)}
          className={index === selectedIndex ? 'selected' : ''}
          whileHover={{ x: 5 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <img src={user.avatar_url} alt={user.login} className="avatar-xs" />
          <span>{user.login}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default SuggestionDropDown;
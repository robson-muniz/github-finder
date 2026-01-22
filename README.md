# 🐙 GitHub Finder

A beautifully designed, responsive GitHub user search application built with React, TypeScript, and modern web technologies. Discover GitHub users with an elegant interface that provides detailed profiles, smart suggestions, and smooth animations.

![GitHub Finder Preview](public/githubfinder.png)

## ✨ Features

### 🔍 Smart Search
- **Real-time suggestions** with GitHub user auto-complete
- **Debounced search** for optimal performance
- **Keyboard navigation** (↑↓ arrows + Enter) in suggestions dropdown
- **Recent searches** with localStorage persistence

### 👤 Enhanced User Profiles
- **Detailed user information** (repos, followers, following, join date, location)
- **Professional card design** with smooth animations
- **GitHub stats visualization** in a clean grid layout
- **Direct GitHub profile link** with animated button

### 🎨 Premium Design
- **Responsive design** that works on all devices
- **Smooth animations** using Framer Motion
- **Professional loading skeletons** for better UX
- **Modern color scheme** with CSS variables
- **Clean, minimalist interface**

### ⚡ Performance
- **React Query** for efficient data fetching and caching
- **Optimized API calls** with proper error handling
- **Component-based architecture** for maintainability
- **Type-safe** with TypeScript throughout

## 🚀 Live Demo

[View Live Demo](https://github-finder-swart-five.vercel.app/)


## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool & Dev Server |
| **TanStack Query** | Data Fetching & Caching |
| **Framer Motion** | Animations |
| **React Icons** | Icon Library |
| **CSS3** | Styling with CSS Variables |
| **GitHub REST API** | Data Source |

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- GitHub account (for API access)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/github-finder.git
   cd github-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add:
   ```env
   VITE_GITHUB_API_URL=https://api.github.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
github-finder/
├── src/
│   ├── components/
│   │   ├── UserSearch.tsx      # Main search component
│   │   ├── UserCard.tsx        # Enhanced user profile
│   │   ├── UserCardSkeleton.tsx # Loading skeleton
│   │   ├── RecentSearches.tsx  # Recent searches list
│   │   ├── SuggestionDropDown.tsx # Auto-suggestions
│   │   └── (other components)
│   ├── api/
│   │   └── github.ts           # GitHub API functions
│   ├── hooks/
│   │   └── useDebounce.ts      # Custom debounce hook
│   ├── types/
│   │   └── types.ts            # TypeScript definitions
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 API Configuration

The app uses the official GitHub REST API. No authentication is required for basic user lookup, but be mindful of rate limits:

- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

To authenticate (optional):
1. Create a GitHub Personal Access Token
2. Add to `.env.local`:
   ```env
   VITE_GITHUB_TOKEN=your_token_here
   ```
3. Update `api/github.ts` to include the token in requests

## 💡 How It Works

### Search Flow
1. User types in search field (minimum 2 characters)
2. Debounced API call fetches suggestions
3. Suggestions appear in dropdown with keyboard navigation
4. User selects or submits a search
5. Detailed user data loads with skeleton animation
6. User added to recent searches (max 5)
7. Data cached with React Query for fast re-fetching

### Performance Features
- **Query caching**: Automatic cache management
- **Prefetching**: Hover over recent searches prefetches data
- **Skeletons**: Smooth loading experience
- **Debouncing**: Reduces unnecessary API calls

## 📱 Responsive Design

The app is fully responsive across all device sizes:

- **Desktop**: Full layout with sidebar suggestions
- **Tablet**: Optimized spacing and typography
- **Mobile**: Stacked layout with touch-friendly elements
- **Accessibility**: Keyboard navigation, ARIA labels, proper contrast

## 🎨 Customization

### Theme Colors
Edit CSS variables in `index.css`:
```css
:root {
  --primary-color: #0077ff;
  --secondary-color: #24292e;
  --background-color: #f8fafc;
  /* ... more variables */
}
```

### Adding Features
1. **Add more user data**: Extend the `GithubUser` type and API calls
2. **Add repository view**: Create `UserRepositories` component
3. **Add animations**: Use Framer Motion variants
4. **Add tests**: Install React Testing Library

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Run linter
npm run lint

# Type checking
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
```bash
npm run build
npm run deploy
```

## 📈 Performance Metrics

| Metric | Score |
|--------|-------|
| First Contentful Paint | < 1s |
| Time to Interactive | < 2s |
| Bundle Size | ~150KB gzipped |
| Lighthouse Score | 95+ |

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code style
- Add tests for new features
- Update documentation as needed

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub** for their excellent REST API
- **React Query** team for amazing data fetching
- **Framer Motion** for beautiful animations
- **React Icons** for the icon library
- **Vite** for the lightning-fast build tool

## 👨‍💻 Author

**Robson Muniz**  
📍 Based in Portugal  
💻 Made with ❤️ and a lot of ☕  

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/robson-muniz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/robsonmuniz/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/robsonmunizdev)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

[![GitHub stars](https://img.shields.io/github/stars/robson-muniz/github-finder?style=social)](https://github.com/robson-muniz/github-finder/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/robson-muniz/github-finder?style=social)](https://github.com/robson-muniz/github-finder/network/members)

---

**Want to see more projects?** Check out my [GitHub profile](https://github.com/robson-muniz) for other interesting projects and contributions!

## 🐛 Known Issues & TODOs

- [ ] Add unit tests with Vitest
- [ ] Implement repository list view
- [ ] Add GitHub OAuth for higher rate limits
- [ ] Add offline support with service workers
- [ ] Implement i18n for multiple languages
- [ ] Add share functionality for user profiles

*Found a bug?* [Open an issue](https://github.com/robso-nmuniz/github-finder/issues)

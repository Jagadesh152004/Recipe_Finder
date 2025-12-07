# 🍳 Recipe Finder

A modern, responsive React web application that helps you discover and explore recipes from around the world. Built with React, Vite, Tailwind CSS, and the TheMealDB API.

![Recipe Finder App](https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=400&fit=crop)

## ✨ Features

## 🖼️ Screenshots

Below are the actual screenshots captured from the running app plus the original placeholder.

### Desktop

![Desktop screenshot](/public/screenshot-desktop.png)

*Caption: Desktop view (1366×768) showing the search bar, category filters and recipe grid.*

### Mobile

![Mobile screenshot](/public/screenshot-mobile.png)

*Caption: Mobile view (390×844) showing the responsive layout and mobile menu.*

You can replace the `public/screenshot-*.png` files in `public/` with new screenshots at any time and commit them to update this README.


- 🔍 **Search Recipes** - Search for recipes by name (e.g., chicken, pasta, cake)
- 🏷️ **Filter by Category** - Browse recipes by categories (Breakfast, Dessert, Seafood, Vegetarian, Chicken, Beef, Pasta)
- 🌙 **Dark Mode** - Toggle between light and dark themes with persistent preference
- 👤 **User Authentication** - Login modal for user authentication (demo mode)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎯 **Recipe Details** - View detailed instructions and video tutorials for each recipe
- 💾 **Local Storage** - Save your theme preference and settings

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite plugin
- **API**: TheMealDB API
- **Icons**: Lucide React
- **Linting**: ESLint

## 📁 Project Structure

```
recipe-finder/
├── src/
│   ├── App.jsx                 # Main application component with all features
│   ├── main.jsx                # React application entry point
│   ├── index.css               # Global styles and CSS variables
│   └── assets/                 # Images and static assets
├── public/                      # Static files (logo, etc.)
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── eslint.config.js            # ESLint configuration
├── package.json                # Project dependencies
└── README.md                    # This file
```

## 🧩 Components

### Main App Component (`App.jsx`)
The core of the application with the following sub-components:

1. **LoginModal** - User authentication modal
2. **DarkModeToggle** - Light/dark theme toggle button
3. **MobileMenu** - Mobile navigation menu with dark mode toggle
4. **SearchBar** - Recipe search input with search button
5. **FilterBar** - Category filter buttons
6. **RecipeCard** - Individual recipe display card with details
7. **RecipeList** - Grid layout for multiple recipe cards

### Features in Each Component

- **LoginModal**: Username/password inputs with keyboard support (Enter to submit)
- **SearchBar**: Real-time search with Enter key support
- **FilterBar**: Scroll-able category buttons with active state highlighting
- **RecipeCard**: Expandable recipe details, instructions, and YouTube link
- **Dark Mode**: Inline styles for instant color transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recipe-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

Or access from another device on your LAN:
```
http://<your-ip-address>:5173
```

## 📜 Available Scripts

- `npm run dev` - Start development server with network access
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## 🎨 Dark Mode

- Click the **sun/moon icon** in the header (desktop) or menu (mobile)
- Theme preference is automatically saved to localStorage
- Smooth transitions between light and dark modes
- Light mode: Orange/Red gradient background
- Dark mode: Dark gray/blue gradient background

## 🔗 API Integration

The app uses the **TheMealDB API** (free, no authentication required):
- Search recipes by name: `/search.php?s={query}`
- Filter by category: `/filter.php?c={category}`
- Get meal details: `/lookup.php?i={mealId}`

## 🎯 How to Use

1. **Search for Recipes**: Type a recipe name in the search bar and press Enter or click the search button
2. **Browse by Category**: Click on any category button to view recipes in that category
3. **View Recipe Details**: Click "View Recipe" on any recipe card to see instructions and video link
4. **Toggle Theme**: Click the sun/moon icon to switch between light and dark modes
5. **Login** (Demo): Click "Login" to access the demo authentication modal

## 🌐 Network Access

To access your app from another system on the same network:

1. Find your machine's IP address:
   ```powershell
   ipconfig
   ```
   Look for IPv4 Address (e.g., `10.204.32.123`)

2. On another device, open your browser and visit:
   ```
   http://<your-ip-address>:5173
   ```

3. If you get a connection refused error, you may need to allow port 5173 through Windows Firewall:
   ```powershell
   New-NetFirewallRule -DisplayName "Vite 5173" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 5173
   ```

## 🐛 Troubleshooting

### Dark Mode Not Working
- Make sure your browser supports CSS classes on the root element
- Check that `localStorage` is not disabled
- Open browser DevTools and check the console for errors

### Recipes Not Loading
- Check your internet connection
- Verify the TheMealDB API is accessible
- Check the browser console for API error messages

### Port Already in Use
- Change the port in `vite.config.js`
- Or kill the process using port 5173

## 📝 Notes

- The app uses inline styles for dark mode colors alongside Tailwind CSS dark: prefixes
- All data is fetched from TheMealDB API in real-time (no caching)
- The login feature is for demonstration purposes only
- Theme preference is stored in browser localStorage

## 🔄 Git Repository

The project is tracked with Git. To push changes:

```bash
git add .
git commit -m "Your commit message"
git push -u origin main
```

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Feel free to fork this project, make improvements, and submit pull requests!

---

**Happy Recipe Hunting! 🍽️**


# Bookmarker.dev

A free, lightweight bookmark manager built with modern web technologies. Organize, manage, and customize your bookmarks entirely in your browser with local data persistence.

## Features

- 📌 **Easy Bookmark Management** — Add, edit, delete, and reorder bookmarks with a simple interface
- 🎨 **Customizable Theme** — Change background color, text color, and add custom background images
- 🖼️ **Automatic Favicons** — Bookmarks automatically display website favicons
- 💾 **Local Storage** — All data persists locally in your browser—no server, no account needed
- ⚡ **Fast & Responsive** — Built with Vue 3 and Tailwind CSS for a smooth user experience
- 🎯 **Drag & Drop** — Reorder bookmarks by dragging and dropping
- 📱 **Modern Stack** — TypeScript, Nuxt 4, Pinia, and Tailwind CSS v4

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) with Vue 3
- **Language:** TypeScript
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Drag & Drop:** [vuedraggable](https://github.com/SortableJS/vue.draggable.next)
- **Icons:** [Nuxt Icon](https://icon.nuxt.com/) (Lucide)
- **Package Manager:** Yarn

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/davidglaeseman/bookmarker.dev.git
cd bookmarker.dev

# Install dependencies
yarn install
```

### Development

```bash
# Start the development server
yarn dev
# Open http://localhost:3000 in your browser
```

### Building

```bash
# Build for production
yarn build

# Generate static site (pre-render)
yarn generate

# Preview production build locally
yarn preview
```

### Code Quality

```bash
# Run ESLint
yarn lint

# Fix linting issues
yarn lint:fix
```

## Project Structure

```
bookmarker.dev/
├── app/
│   ├── app.vue                    # Root component
│   ├── components/                # Vue components
│   │   ├── the-bookmark.vue       # Bookmark card
│   │   ├── edit-bookmark.vue      # Add/edit form
│   │   ├── global-settings.vue    # Settings modal
│   │   ├── the-modal.vue          # Reusable modal
│   │   └── form controls...
│   ├── stores/
│   │   └── useAppStore.ts         # Pinia store
│   ├── composables/
│   │   └── useHelpers.ts          # Shared utilities
│   └── assets/
│       └── css/                   # Tailwind & global styles
├── nuxt.config.ts                 # Nuxt configuration
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencies
└── CLAUDE.md                       # Development guide
```

## How It Works

### State Management

The app uses a single Pinia store (`useAppStore.ts`) that manages:
- **Bookmarks** — Array of bookmark objects with name, URL, favicon, and unique key
- **Settings** — User customization (colors, background image, CSS properties)
- **UI State** — Modal visibility and active bookmark state

All state automatically persists to localStorage.

### Data Persistence

Bookmarks and settings are stored in the browser's localStorage:
- `localStorage.bookmarks` — Array of bookmark objects
- `localStorage.settings` — Settings object

No backend or database—everything is client-side. Data persists across browser sessions.

### Adding a Bookmark

1. Click the **Add** button
2. Fill in the bookmark name and URL
3. The app validates the URL and fetches the favicon automatically
4. Click **Save** to add the bookmark

Your bookmark is instantly persisted to localStorage.

### Customizing Your Theme

1. Click the **Settings** button (bottom-left)
2. Adjust:
   - **Background Color** — Solid color background
   - **Text Color** — Bookmark and UI text color
   - **Background Image** — Upload a custom image with position/size controls
3. Changes apply instantly and persist

## Browser Support

Modern browsers with ES2020+ support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

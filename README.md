# ProjectPassword

A visually striking React-based password generator with a brutalist/poster-style dark theme aesthetic.

![ProjectPassword](https://img.shields.io/badge/React-19.2.3-black?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Latest-646cff?style=flat&logo=vite)

## Features

- **Customizable Password Generation**
  - Adjustable length (6-32 characters)
  - Toggle uppercase letters, lowercase letters, numbers, and symbols
  - Ensures at least one character from each selected type

- **Visual Strength Indicator**
  - 4-tier strength meter: WEAK, OKAY, GOOD, EPIC
  - Color-coded display (Red, Yellow, Blue, Green)

- **Modern UI/UX**
  - Copy to clipboard with visual feedback
  - Interactive range slider
  - Brutalist/poster-style design with hover effects
  - Responsive layout

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser and navigate to the URL shown in the terminal.

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist` folder.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Tech Stack

- **React 19.2.3** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons

## Project Structure

```
src/
├── main.tsx              # Application entry point
├── App.tsx               # Main layout
├── components/
│   └── PasswordGenerator.tsx  # Core generator component
├── utils/
│   ├── password.ts       # Generation & strength logic
│   └── cn.ts             # className utility
└── index.css             # Global styles
```

## License

MIT

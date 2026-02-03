# NERV | INTERNAL NETWORK

Interactive web timeline showcasing Neon Genesis Evangelion episodes with NERV-inspired aesthetics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎯 Overview

A single-page website with an immersive interface presenting Neon Genesis Evangelion episodes in an interactive timeline. The design draws inspiration from NERV aesthetics featuring parallax effects, smooth animations, and a hexagonal grid system.

## ✨ Features

- **Parallax Hero Section**: Landing section with parallax background effect
- **Interactive Timeline**: Episode display with scroll-triggered reveal animations
- **Hexagonal Design**: Stylized hexagonal frames for episode images
- **Lazy Loading**: Progressive image loading for optimized performance
- **Responsive**: Adapted design for mobile and tablet devices
- **Accessibility**: Support for `prefers-reduced-motion` to reduce animations
- **Back-to-Top Button**: Smooth scroll-to-top functionality

## 🛠️ Technologies

- **HTML5**: Semantic structure
- **CSS3**: Animations, Grid Layout, Custom Properties
- **Vanilla JavaScript**: No external dependencies
- **Fonts**: Google Fonts (Share Tech Mono) + custom font

## 📁 Project Structure

```
ev-archive/
├── index.html          # Main page
├── script.js           # JavaScript logic
├── styles.css          # CSS styles
├── data.json           # Episode data
├── fonts/              # Custom fonts
│   └── TT-JTCEEECEiM9P.woff2
└── media/              # Images and media
    ├── bg.webp
    ├── 01.webp
    ├── 02.webp
    └── ...
```

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/fortyup/ev-archive.git
cd ev-archive
```

2. Open `index.html` in a browser or use a local server:
```bash
# With Node.js (http-server)
npx http-server
```

3. Open in browser: `http://localhost:8000`

## 📝 Data Structure

The `data.json` file contains an array of episodes with the following structure:

```json
{
  "episodes": [
    {
      "phase": "PHASE 01",
      "title": "L'ATTAQUE DE L'ANGE",
      "subtitle": "使徒、襲来 (Shito, Shūrai)",
      "description": "Episode description...",
      "image": "media/01.webp",
      "imageAlt": "Angel Attack",
      "hex": "01",
      "orientation": "left"
    }
  ]
}
```

### Properties

- `phase`: Phase/episode number
- `title`: Episode title (French translation)
- `subtitle`: Original Japanese title with romanization
- `description`: Episode synopsis
- `image`: Path to image file
- `imageAlt`: Alternative text for accessibility
- `hex`: Hexagonal number displayed
- `orientation`: Element position (`left` or `right`)

## 🎨 Customization

### CSS Variables

Main colors are defined in `:root`:

```css
:root {
    --nerv-white: #ffffff;
    --nerv-black: #000000;
    --nerv-red: #ff0000;
    --bg-black: #000000;
}
```

### Adding Episodes

Edit `data.json` by adding a new object to the `episodes` array with the appropriate structure.

## 🔧 Optimizations

- **Lazy Loading**: Images loaded only when visible
- **RequestAnimationFrame**: Optimized animations via RAF
- **Passive Event Listeners**: Improved scroll performance
- **DOM Fragment**: Batch DOM construction to reduce reflows
- **Prefers-Reduced-Motion**: Respects accessibility preferences

## 📱 Compatibility

- Chrome/Edge (latest versions)
- Firefox (latest versions)
- Safari (latest versions)
- Mobile and tablet support

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more details.

## 👤 Author

**fortyup**
- Discord: [fortyup](https://discord.com/users/fortyup)
- Twitter: [@fortyup_](https://twitter.com/fortyup_)
- GitHub: [@fortyup](https://github.com/fortyup)

## 🙏 Acknowledgments

- Neon Genesis Evangelion © GAINAX/khara
- Design inspired by official NERV aesthetics
- Evangelion fan community

---

**⚠️ EMERGENCY / 警告 / EMERGENCY** - This project is an unofficial fan-site created by a fan for fans.
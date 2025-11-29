# 🚀 Seif Ben Ali - Portfolio

A modern, iOS-inspired portfolio website built with React, TypeScript, and Tailwind CSS.

![Portfolio Preview](public/opengraph.png)

## ✨ Features

- 📱 iOS-inspired UI design
- 🎨 Smooth animations with Framer Motion
- 📊 Lazy loading for better performance
- 🌙 Glassmorphism effects
- 📄 Downloadable CV (EN/FR)
- 📧 Contact form with email integration
- 🚀 Deployed on GitHub Pages

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Deployment:** GitHub Pages

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── assets/
│   │   ├── images/      # Profile, background images
│   │   ├── icons/       # Tech stack SVG icons
│   │   └── cv/          # CV files (EN/FR)
│   ├── components/
│   │   ├── ui/          # Button, Input, Textarea
│   │   ├── NavBar.tsx
│   │   └── SectionModal.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   ├── favicon.png
│   └── opengraph.png
├── .github/
│   └── workflows/
│       └── deploy.yml
└── index.html
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SeifG-13/portfolio.git

# Navigate to project
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment

The project is configured for automatic deployment to GitHub Pages via GitHub Actions.

1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Site available at: `https://seifg-13.github.io/portfolio/`

## ⚙️ Configuration

### Change GitHub Username

Update `vite.config.ts`:
```ts
base: "/your-repo-name/",
```

Update `index.html` meta tags with your URL.

### Add Project URLs

Edit `src/pages/Projects.tsx`:
```ts
{
  title: "Your Project",
  github: "https://github.com/your-repo",
  demo: "https://your-demo-site.com"
}
```

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

## 👤 Author

**Seif Ben Ali**
- GitHub: [@SeifG-13](https://github.com/SeifG-13)
- LinkedIn: [seif-ben-ali](https://linkedin.com/in/seif-ben-ali)
- Email: seif.benali@ensi-uma.tn

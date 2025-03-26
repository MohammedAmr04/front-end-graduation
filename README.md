# Front-end Graduation Project

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0.6-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, responsive web application built with React and Vite. This project demonstrates best practices in front-end development, including state management, routing, and UI/UX design.

## 🌟 Key Features

- ⚡️ Lightning-fast performance with Vite
- 🎨 Modern UI with Tailwind CSS and Bootstrap
- 🔄 Efficient state management using Redux Toolkit
- 🛡️ Form validation with Joi
- 📱 Fully responsive design
- 🔍 SEO optimized
- 🧪 Testing setup with Jest
- 📦 Optimized build process

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MohammedAmr04/front-end-graduation
cd front-end-graduation
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Production

Build for production:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
src/
├── admin/         # Admin panel components and features
├── assets/        # Static assets (images, fonts, etc.)
├── components/    # Reusable UI components
│   ├── common/    # Shared components
│   └── features/  # Feature-specific components
├── layouts/       # Layout components and templates
├── pages/         # Page components and routes
├── routes/        # Route configurations
├── store/         # Redux store and slices
│   ├── actions/   # Redux actions
│   ├── reducers/  # Redux reducers
│   └── selectors/ # Redux selectors
├── styles/        # Global styles and CSS modules
├── utils/         # Utility functions and helpers
└── test/          # Test files and configurations
```

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management
- [React Router DOM](https://reactrouter.com/) - Routing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Bootstrap](https://getbootstrap.com/) - UI Framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [Axios](https://axios-http.com/) - HTTP Client
- [Joi](https://joi.dev/) - Validation

## 📝 Available Scripts

| Script            | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Starts the development server |
| `npm run build`   | Builds the app for production |
| `npm run preview` | Preview the production build  |
| `npm run lint`    | Run ESLint                    |
| `npm run test`    | Run tests                     |
| `npm run format`  | Format code with Prettier     |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url_here
VITE_APP_TITLE=Your App Title
```

### Vite Configuration

The project uses Vite for development and building. Configuration can be found in `vite.config.js`.

### Tailwind Configuration

Tailwind CSS is configured in `tailwind.config.js`. Customize the theme and plugins as needed.

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📦 Build

The build process is optimized for production:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow the ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add appropriate comments and documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - _Initial work_ - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the fast build tool
- All contributors and maintainers of the used libraries
- Special thanks to all contributors who have helped shape this project

## 📞 Support

For support, email your.email@example.com or create an issue in the repository.

---

Made with ❤️ by [Your Name]

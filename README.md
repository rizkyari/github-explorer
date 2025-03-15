# 📌 GitHub Repositories Explorer

A React + TypeScript application that allows users to search GitHub users and view their repositories.

## 🚀 Live Demo: GitHub Explorer
[GitHub Explorer](https://github-explorer-ebon-gamma.vercel.app/)

## 📜 Features

- ✅ Search GitHub Users – Displays up to 5 matching users based on search input.
- ✅ View User Repositories – Click on a user to see their public repositories.
- ✅ Star Count Display – Shows the number of stars for each repository.
- ✅ Accordion-style Repository List – Expands repositories within the user dropdown.
- ✅ State Management with Redux Toolkit – Efficient data handling.
- ✅ Tailwind CSS for Styling – Responsive and modern UI.
- ✅ Error Handling & Loading States – Improves user experience.

## ⚙️ Technologies Used

- React (with TypeScript)

- Redux Toolkit (State Management)

- Tailwind CSS (Styling)

- Axios (API Requests)

- React Router (Routing)

## 📥 Installation & Setup

Follow these steps to run the project locally:

1️⃣ Clone the Repository
```
git clone https://github.com/your-username/github-explorer.git
cd github-explorer
```

2️⃣ Install Dependencies

```
npm install
```

3️⃣ Create a .env File

Rename .env.example to .env and set your GitHub API Base URL:
```
REACT_APP_API_BASE_URL=https://api.github.com
```

4️⃣ Start the Application

```
npm start
```

The app will run at: http://localhost:3000

## 📦 Project Structure
```
📦 github-explorer
├── 📂 src
│   ├── 📂 components    # Reusable UI components
│   ├── 📂 pages         # App pages (Home, UserDetail)
│   ├── 📂 store         # Redux store & slices
│   ├── 📂 utils         # API calls & helpers
│   ├── App.tsx         # Main app component
│   ├── index.tsx       # Entry point
│   ├── styles.css      # Global styles
├── .env.example        # Example environment variables
├── README.md           # Project documentation
├── package.json        # Dependencies & scripts
└── tsconfig.json       # TypeScript configuration
```

## 🚀 Deployment

- Deploy on Vercel

- Install Vercel CLI
```
npm install -g vercel
```

- Deploy the App
```
vercel --prod
```
The project is now live at: [GitHub Explorer](https://github-explorer-ebon-gamma.vercel.app/)

## 🛠️ Known Issues & Future Improvements

- 🚧 Unit & Integration Tests: Due to time constraints, tests were not implemented yet.

- 🚀 Caching Optimization: Store API results for better performance.

- 🔍 Advanced Search: Add filtering by programming language, repo size, etc.

## 🤝 Contributing

- Fork the repository

- Create a feature branch (git checkout -b feature-name)

- Commit changes (git commit -m 'Add feature')

- Push to the branch (git push origin feature-name)

- Open a Pull Request

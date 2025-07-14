# Guide for building frontend

## 1. Download Packages

```bash
# Create a Vite package
npm create vite@latest

# Integrate Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Integrate shadcn UI
npx shadcn-ui@latest init
```

## 2. Download Tanstack Query

```bash
# install the package
npm i @tanstack/react-query

# install the devtools
npm i @tanstack/react-query-devtools
```
- Add QueryClientProvider and ReactQueryDevtools to the `main.tsx` file.
- add the react-router-dom
```bash
npm i react-router-dom
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: '#1e1e1e',
          sidebar: '#252526',
          activity: '#333333',
          text: '#cccccc',
          accent: '#007acc',
          keyword: '#569cd6',
          string: '#ce9178',
          comment: '#6a9955',
          function: '#dcdcaa',
          variable: '#9cdcfe'
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
      }
    },
  },
  plugins: [],
}

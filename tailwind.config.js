/** @type {import('tailwindcss').Config} */
const preset = require('./src/global/tokens/preset')();

const tailwindConfig = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./src/index.html"
  ],
  darkMode: 'class',
  ...preset,
  corePlugins: {
    preflight: false,
  },
};

// Support both Node.js (module.exports) and browser (window.tailwindConfig)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = tailwindConfig;
} else if (typeof window !== 'undefined') {
  window.tailwindConfig = tailwindConfig;
}
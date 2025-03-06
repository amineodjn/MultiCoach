/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  plugins: [forms, flowbitePlugin],
};

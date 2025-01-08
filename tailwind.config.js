/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'ql-container',
    'ql-editor',
    'ql-toolbar',
    'ql-snow',
    'ql-bubble',
    'ql-picker',
    'ql-picker-item',
    'ql-active',
    'ql-selected',
    'ql-blank',
    'ql-direction',
    'ql-align',
    'ql-video',
    'ql-image',
    'ql-bold',
    'ql-italic',
    'ql-link',
    'ql-code-block',
    // Agrega más clases según tus necesidades
  ],
}


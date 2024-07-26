// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}', // 根据项目的实际文件路径配置
  ],
  theme: {
    extend: {
      maxWidth: {
        'lg': '55rem',
      },
      maxheight: {
        'lg': '50rem',
      },

    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

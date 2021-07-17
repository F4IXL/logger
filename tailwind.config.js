module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/components/*.vue',
      './src/views/*.vue',
      './src/*.vue'
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        check: "url('/icons/check.svg')"
      })
    }
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'checked'],
      borderColor: ['dark', 'checked'],
      textColor: ['dark'],
      placeholderColor: ['dark'],
      inset: ['checked'],
      zIndex: ['hover', 'active']
    }
  },
  plugins: []
}

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          primary: '#BB86FC',
          secondary: '#03DAC6',
          text: '#E1E1E1',
        },
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.dark.text'),
            a: {
              color: theme('colors.dark.primary'),
              '&:hover': {
                color: theme('colors.dark.secondary'),
              },
            },
            h1: {
              color: theme('colors.dark.text'),
            },
            h2: {
              color: theme('colors.dark.text'),
            },
            h3: {
              color: theme('colors.dark.text'),
            },
            strong: {
              color: theme('colors.dark.text'),
            },
            code: {
              color: theme('colors.dark.secondary'),
            },
            blockquote: {
              color: theme('colors.dark.text'),
              borderLeftColor: theme('colors.dark.primary'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
}
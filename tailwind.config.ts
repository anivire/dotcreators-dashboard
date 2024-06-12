import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'hubot-sans': ['var(--font-hubot-sans)'],
        'console': ['var(--font-console)'],
      },
      colors: {
        'dot-white': '#FDFDFD',
        'dot-rose': '#FA4545',
        'dot-rose-light': '#FF8888',
        'dot-green': '#c1e557',
        'dot-yellow': '#E69D35',
        
        'dot-sky-dark': '#438e96',
        'dot-green-dark': '#729917',
        'dot-yellow-dark': '#d87607',

        'dot-link-primary': '#FF902B',
        'dot-button-primary': '#FA4545',
        'dot-button-confirm': '#CEDF52',
        'dot-button-warning': '#FA4545',

        'dot-body': '#090909',
        'dot-primary': '#101010',
        'dot-secondary': '#202020',
        'dot-tertiary': '#303030',
        'dot-quaternary': '#666666',

        'dark-text': '#FDFDFD',
        'c-amber-light': '#FF9D41',
        'c-amber-dark': '#F97039',
        'c-rose-light': '#FC3E42',
        'c-rose-dark': '#C92020',
        'c-emerald-light': '#94BD33',
        'c-emerald-dark': '#3DC454',
      },
    },
  },
  plugins: [],
};
export default config;

/** @type {import('tailwindcss').Config} */
import themer from "@tailus/themer";
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./*.html", "./*.js"],
    darkMode: "media",
    safelist: ["isToggled"],
    theme: {
        colors: ({ colors }) => ({
            // primary: colors.blue,
            primary: {
                50: '#fff9ed',
                100: '#fff1d4',
                200: '#ffdfa8',
                300: '#ffc770',
                400: '#ffa337',
                500: '#ff8710',
                600: '#f36c06',
                700: '#c75007',
                800: '#9e3f0e',
                900: '#7f360f',
                950: '#451905',
            },            
            secondary: colors.lime,
            accent: colors.pink,
            success: colors.lime,
            danger: colors.red,
            warning: colors.yellow,
            info: colors.blue,
            // gray: colors.zinc,
            gray: {
                50: '#f5f6fa',
                100: '#eaedf4',
                200: '#d1d8e6',
                300: '#a8b6d1',
                400: '#798fb7',
                500: '#58719f',
                600: '#455a84',
                700: '#39486b',
                800: '#323e5a',
                900: '#2d364d',
                950: '#212738',
            },
            
            white: colors.white,
            black: colors.black,
            transparent: colors.transparent,
      }),
      fontFamily: {
        sans: ['Geist', 'Inter', ...defaultTheme.fontFamily.sans],
        mono : ['GeistMono', 'fira-code', ...defaultTheme.fontFamily.mono],
      },
        keyframes: {
            loop: {
                to: {
                    "offset-distance": "100%",
                },
            },
        },
        
    },
    plugins: [
        themer({
            radius: "smoothest",
            background: "lighter",
            border: "light",
            padding:"large",
            components: {
                button: {
                    rounded : "2xl"
                }
            }
        })
    ],
};

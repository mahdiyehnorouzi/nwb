const themeGenerator = require("tailwindcss-themer");

const colors = require("./palette");
const { lightTheme, darkTheme } = require("./themes");

module.exports = ({
  lightThemeOverrides,
  darkThemeOverrides,
  themes = [],
} = {}) => ({
  theme: {
    colors,
    fontSize: {
      "3xl": "56px", //extra large
      "2xl": "36px", //large
      xl: "28px",
      h1: "24px", // heading
      h2: "20px",
      h3: "17px",
      s: "15px", // subtitle
      b: "15px", // body
      c1: "13px", // caption
      c2: "12px",
      o: "11px", // overline
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    extend: {
      zIndex: {
        60: "60",
        160: "160",
        170: "170",
        180: "180",
        190: "190",
        200: "200",
      },
      opacity: {
        8: "0.08",
      },
    },
  },
  plugins: [
    themeGenerator({
      defaultTheme: {
        extend: { ...lightTheme, ...lightThemeOverrides },
      },
      themes: [
        {
          name: "darkTheme",
          selectors: [".dark-mode", '[data-theme="dark"]', ".dark"],
          extend: { ...darkTheme, ...darkThemeOverrides },
        },
        ...themes,
      ],
    }),
  ],
});

const colors = require("../../palette");

const neutral = {
  primary: {
    DEFAULT: colors.neutral["160"],
    hover: colors.neutral["170"],
    press: colors.neutral["190"],
    disable: colors.neutral["40"],
  },
  secondary: {
    DEFAULT: colors.neutral["120"],
    hover: colors.neutral["130"],
    press: colors.neutral["140"],
    disable: colors.neutral["40"],
  },
  tertiary: {
    DEFAULT: colors.neutral["80"],
    hover: colors.neutral["10"],
    press: colors.neutral["10"],
    disable: colors.neutral["50"],
  },
  quaternary: {
    DEFAULT: colors.white,
    hover: colors.neutral["10"],
    press: colors.neutral["10"],
    disable: colors.neutral["50"],
  },
};

const brand = {
  primary: {
    DEFAULT: colors.primary["80"],
    hover: colors.primary["90"],
    press: colors.primary["100"],
    disable: colors.primary["30"],
  },
  secondary: {
    DEFAULT: colors.primary["50"],
    hover: colors.primary["70"],
    press: colors.primary["20"],
    disable: colors.primary["70"],
  },
  quaternary: {
    DEFAULT: colors.primary["90"],
    hover: colors.primary["80"],
    press: colors.primary["60"],
    disable: colors.primary["60"],
  },
};

const critical = {
  primary: {
    DEFAULT: colors.red["60"],
    hover: colors.red["90"],
    press: colors.red["100"],
    disable: colors.red["40"],
  },
  secondary: {
    DEFAULT: colors.red["60"],
    hover: colors.red["70"],
    press: colors.red["80"],
    disable: colors.red["40"],
  },
};

const warning = {
  primary: {
    DEFAULT: colors.yellow["90"],
    hover: colors.yellow["100"],
    press: colors.yellow["110"],
    disable: colors.yellow["20"],
  },
  secondary: {
    DEFAULT: colors.yellow["60"],
    hover: colors.yellow["70"],
    press: colors.yellow["80"],
    disable: colors.yellow["20"],
  },
};

const purple = {
  primary: {
    DEFAULT: colors.purple["80"],
    hover: colors.purple["90"],
    press: colors.purple["100"],
    disable: colors.purple["20"],
  },
  secondary: {
    DEFAULT: colors.purple["20"],
    hover: colors.purple["40"],
    press: colors.purple["60"],
    disable: colors.purple["10"],
  },
};

const blue = {
  primary: {
    DEFAULT: colors.blue["60"],
    hover: colors.blue["70"],
    press: colors.blue["80"],
    disable: colors.blue["10"],
  },
  secondary: {
    DEFAULT: colors.blue["10"],
    hover: colors.blue["40"],
    press: colors.blue["50"],
    disable: colors.blue["60"],
  },
};

const disable = {
  bright: colors.neutral["50"],
  matt: colors.neutral["10"],
};

const fixed = {
  primary: {
    DEFAULT: colors.white,
    hover: colors.neutral["10"],
    press: colors.neutral["20"],
    disable: colors.neutral["50"],
  },
  secondary: {
    DEFAULT: colors.neutral["60"],
    hover: colors.neutral["50"],
    press: colors.neutral["40"],
    disable: colors.neutral["80"],
  },
};

exports.textColor = {
  brand,
  critical,
  neutral,
  warning,
  purple,
  blue,
  disable,
  fixed,
};

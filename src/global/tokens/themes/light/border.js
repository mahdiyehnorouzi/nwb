const colors = require("../../palette");

const brand = {
  primary: {
    DEFAULT: colors.primary["80"],
    hover: colors.primary["90"],
    press: colors.primary["100"],
    disable: colors.primary["10"],
  },
  secondary: {
    DEFAULT: colors.primary["50"],
    hover: colors.primary["50"],
    press: colors.primary["60"],
    disable: colors.primary["10"],
  },
};

const neutral = {
  primary: {
    DEFAULT: colors.neutral["10"],
    hover: colors.neutral["30"],
    press: colors.neutral["50"],
    disable: colors.neutral["30"],
  },
  secondary: {
    DEFAULT: colors.neutral["20"],
    hover: colors.neutral["50"],
    press: colors.neutral["70"],
    disable: colors.neutral["70"],
  },
  tertiary: {
    DEFAULT: colors.neutral["40"],
    hover: colors.neutral["60"],
    press: colors.neutral["80"],
    disable: colors.neutral["30"],
  },
  quaternary: {
    DEFAULT: colors.neutral["60"],
    hover: colors.neutral["70"],
    press: colors.neutral["80"],
    disable: colors.neutral["30"],
  },
};

const critical = {
  primary: {
    DEFAULT: colors.red["70"],
    hover: colors.red["80"],
    press: colors.red["90"],
    disable: colors.red["30"],
  },
  secondary: {
    DEFAULT: colors.red["30"],
    hover: colors.red["40"],
    press: colors.red["50"],
    disable: colors.red["50"],
  },
  tertiary: {
    DEFAULT: colors.red["20"],
    hover: colors.red["30"],
    press: colors.red["30"],
    disable: colors.red["10"],
  },
};

const warning = {
  primary: {
    DEFAULT: colors.yellow["80"],
    hover: colors.yellow["90"],
    press: colors.yellow["100"],
    disable: colors.yellow["20"],
  },
  secondary: {
    DEFAULT: colors.yellow["10"],
    hover: colors.yellow["20"],
    press: colors.yellow["30"],
    disable: colors.yellow["10"],
  },
};

const disable = {
  bright: colors.neutral["50"],
  matt: colors.neutral["50"],
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

exports.borderColor = {
  brand,
  neutral,
  critical,
  warning,
  disable,
  fixed,
};

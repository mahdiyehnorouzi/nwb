const colors = require("../../palette");

const brand = {
  primary: {
    DEFAULT: colors.primary["70"],
    hover: colors.primary["60"],
    press: colors.primary["50"],
    disable: colors.primary["100"],
  },
  secondary: {
    DEFAULT: colors.primary["110"],
    hover: colors.primary["90"],
    press: colors.primary["80"],
    disable: colors.primary["10"],
  },
};

const neutral = {
  primary: {
    DEFAULT: colors.neutral["180"],
    hover: colors.neutral["140"],
    press: colors.neutral["120"],
    disable: colors.neutral["150"],
  },
  secondary: {
    DEFAULT: colors.neutral["160"],
    hover: colors.neutral["130"],
    press: colors.neutral["120"],
    disable: colors.neutral["100"],
  },
  quaternary: {
    DEFAULT: colors.neutral["100"],
    hover: colors.neutral["110"],
    press: colors.neutral["100"],
    disable: colors.neutral["140"],
  },
  tertiary: {
    DEFAULT: colors.neutral["140"],
    hover: colors.neutral["120"],
    press: colors.neutral["100"],
    disable: colors.neutral["110"],
  },
};

const critical = {
  primary: {
    DEFAULT: colors.red["70"],
    hover: colors.red["80"],
    press: colors.red["90"],
    disable: colors.red["100"],
  },
  secondary: {
    DEFAULT: colors.red["30"],
    hover: colors.red["40"],
    press: colors.red["50"],
    disable: colors.red["40"],
  },
  tertiary: {
    DEFAULT: colors.red["110"],
    hover: colors.red["90"],
    press: colors.red["100"],
    disable: colors.red["110"],
  },
};

const warning = {
  primary: {
    DEFAULT: colors.yellow["60"],
    hover: colors.yellow["90"],
    press: colors.yellow["100"],
    disable: colors.yellow["110"],
  },
  secondary: {
    DEFAULT: colors.yellow["100"],
    hover: colors.yellow["90"],
    press: colors.yellow["70"],
    disable: colors.yellow["100"],
  },
};

const disable = {
  bright: colors.neutral["120"],
  matt: colors.neutral["120"],
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

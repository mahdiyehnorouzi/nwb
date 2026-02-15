const colors = require("../../palette");

const neutral = {
  primary: {
    DEFAULT: colors.neutral["40"],
    hover: colors.neutral["30"],
    press: colors.neutral["20"],
    disable: colors.neutral["100"],
  },
  secondary: {
    DEFAULT: colors.neutral["60"],
    hover: colors.neutral["50"],
    press: colors.neutral["40"],
    disable: colors.neutral["70"],
  },
  quaternary: {
    DEFAULT: colors.neutral["10"],
    hover: colors.neutral["20"],
    press: colors.neutral["30"],
    disable: colors.neutral["90"],
  },
  tertiary: {
    DEFAULT: colors.neutral["80"],
    hover: colors.neutral["90"],
    press: colors.neutral["100"],
    disable: colors.neutral["90"],
  },
};

const brand = {
  primary: {
    DEFAULT: colors.primary["50"],
    hover: colors.primary["40"],
    press: colors.primary["30"],
    disable: colors.primary["80"],
  },
  secondary: {
    DEFAULT: colors.primary["10"],
    hover: colors.primary["20"],
    press: colors.primary["30"],
    disable: colors.primary["100"],
  },
  quaternary: {
    DEFAULT: colors.primary["10"],
    hover: colors.primary["30"],
    press: colors.primary["40"],
    disable: colors.primary["110"],
  },
};

const critical = {
  primary: {
    DEFAULT: colors.red["60"],
    hover: colors.red["80"],
    press: colors.red["100"],
    disable: colors.red["100"],
  },
  secondary: {
    DEFAULT: colors.red["10"],
    hover: colors.red["30"],
    press: colors.red["40"],
    disable: colors.red["70"],
  },
};

const warning = {
  primary: {
    DEFAULT: colors.yellow["70"],
    hover: colors.yellow["80"],
    press: colors.yellow["90"],
    disable: colors.yellow["110"],
  },
  secondary: {
    DEFAULT: colors.yellow["60"],
    hover: colors.yellow["60"],
    press: colors.yellow["50"],
    disable: colors.yellow["110"],
  },
};

const purple = {
  primary: {
    DEFAULT: colors.purple["30"],
    hover: colors.purple["90"],
    press: colors.purple["100"],
    disable: colors.purple["110"],
  },
  secondary: {
    DEFAULT: colors.purple["110"],
    hover: colors.purple["90"],
    press: colors.purple["60"],
    disable: colors.purple["100"],
  },
};

const blue = {
  primary: {
    DEFAULT: colors.blue["60"],
    hover: colors.blue["70"],
    press: colors.blue["80"],
    disable: colors.blue["110"],
  },
  secondary: {
    DEFAULT: colors.blue["110"],
    hover: colors.blue["90"],
    press: colors.blue["80"],
    disable: colors.blue["30"],
  },
};

const disable = {
  bright: colors.neutral["100"],
  matt: colors.neutral["70"],
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

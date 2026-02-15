const colors = require("../../palette");

const brand = {
  primary: {
    DEFAULT: colors.primary["70"],
    hover: colors.primary["90"],
    press: colors.primary["100"],
    disable: colors.primary["20"],
  },
  secondary: {
    DEFAULT: colors.primary["20"],
    hover: colors.primary["30"],
    press: colors.primary["40"],
    disable: colors.primary["20"],
  },
  quaternary: {
    DEFAULT: colors.primary["90"],
    hover: colors.primary["80"],
    press: colors.primary["70"],
    disable: colors.primary["110"],
  },
  tertiary: {
    DEFAULT: colors.primary["110"],
    hover: colors.primary["80"],
    press: colors.primary["70"],
    disable: colors.primary["20"],
  },
};

const critical = {
  primary: {
    DEFAULT: colors.red["70"],
    hover: colors.red["80"],
    press: colors.red["90"],
    disable: colors.red["20"],
  },
  secondary: {
    DEFAULT: colors.red["10"],
    hover: colors.red["30"],
    press: colors.red["40"],
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
    DEFAULT: colors.yellow["20"],
    hover: colors.yellow["20"],
    press: colors.yellow["30"],
    disable: colors.yellow["10"],
  },
  tertiary: {
    DEFAULT: colors.yellow["50"],
    hover: colors.yellow["80"],
    press: colors.yellow["90"],
    disable: colors.yellow["10"],
  },
};

const neutral = {
  primary: {
    DEFAULT: colors.white,
    hover: colors.neutral["20"],
    press: colors.neutral["40"],
    disable: colors.neutral["10"],
  },
  secondary: {
    DEFAULT: colors.neutral["20"],
    hover: colors.neutral["30"],
    press: colors.neutral["50"],
    disable: colors.neutral["20"],
  },
  tertiary: {
    DEFAULT: colors.neutral["40"],
    hover: colors.neutral["50"],
    press: colors.neutral["70"],
    disable: colors.neutral["20"],
  },
  quaternary: {
    DEFAULT: colors.neutral["160"],
    hover: colors.neutral["180"],
    press: colors.neutral["190"],
    disable: colors.neutral["30"],
  },
  quinary: {
    DEFAULT: colors.neutral["20"],
    hover: colors.neutral["70"],
    press: colors.neutral["80"],
    disable: colors.neutral["20"],
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
    DEFAULT: colors.purple["110"],
    hover: colors.purple["20"],
    press: colors.purple["30"],
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
  matt: colors.neutral["50"],
};

const alpha = {
  neutral: {
    primary: colors.neutral["190"],
  },
};

exports.backgroundColor = {
  brand,
  critical,
  neutral,
  warning,
  purple,
  blue,
  disable,
  alpha,
};

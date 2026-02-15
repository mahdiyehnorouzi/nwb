const colors = require("../../palette");

const brand = {
  primary: {
    DEFAULT: colors.primary["70"],
    hover: colors.primary["60"],
    press: colors.primary["50"],
    disable: colors.primary["110"],
  },
  secondary: {
    DEFAULT: colors.primary["90"],
    hover: colors.primary["80"],
    press: colors.primary["90"],
    disable: colors.primary["110"],
  },
  quaternary: {
    DEFAULT: colors.primary["100"],
    hover: colors.primary["90"],
    press: colors.primary["80"],
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
    DEFAULT: colors.red["60"],
    hover: colors.red["80"],
    press: colors.red["100"],
    disable: colors.red["100"],
  },
  secondary: {
    DEFAULT: colors.red["110"],
    hover: colors.red["90"],
    press: colors.red["110"],
    disable: colors.red["100"],
  },
};

const neutral = {
  primary: {
    DEFAULT: colors.neutral["190"],
    hover: colors.neutral["140"],
    press: colors.neutral["130"],
    disable: colors.neutral["140"],
  },
  secondary: {
    DEFAULT: colors.neutral["180"],
    hover: colors.neutral["140"],
    press: colors.neutral["130"],
    disable: colors.neutral["180"],
  },
  tertiary: {
    DEFAULT: colors.neutral["190"],
    hover: colors.neutral["160"],
    press: colors.neutral["140"],
    disable: colors.neutral["130"],
  },
  quaternary: {
    DEFAULT: colors.neutral["140"],
    hover: colors.neutral["120"],
    press: colors.neutral["120"],
    disable: colors.neutral["140"],
  },
  quinary: {
    DEFAULT: colors.neutral["140"],
    hover: colors.neutral["120"],
    press: colors.neutral["90"],
    disable: colors.neutral["170"],
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
    DEFAULT: colors.yellow["110"],
    hover: colors.yellow["90"],
    press: colors.yellow["60"],
    disable: colors.yellow["100"],
  },
  tertiary: {
    DEFAULT: colors.yellow["40"],
    hover: colors.yellow["70"],
    press: colors.yellow["80"],
    disable: colors.yellow["90"],
  },
};

const purple = {
  primary: {
    DEFAULT: colors.purple["60"],
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
  bright: colors.neutral["130"],
  matt: colors.neutral["100"],
};

const alpha = {
  neutral: {
    primary: colors.neutral["10"],
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

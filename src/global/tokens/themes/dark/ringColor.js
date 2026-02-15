const colors = require('../../palette')

exports.ringColor = {
  primary: {
    DEFAULT: colors.neutral["150"],
  },
  neutral: {
    primary: {
      DEFAULT: colors.neutral["160"],
    },
    secondary: {
      DEFAULT: colors.neutral["140"],
    },
    tertiary: {
      hover: colors.neutral["160"],
    },
  },
  brand: {
    primary: {
      hover: colors.primary["60"],
    },
    secondary: {
      hover: colors.primary["80"],
    },
  },
};

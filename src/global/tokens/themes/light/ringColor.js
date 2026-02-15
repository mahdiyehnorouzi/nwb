const colors = require('../../palette');

const primary = {
  DEFAULT: colors.white,
}

const neutral = {
  primary: {
    DEFAULT: colors.neutral["20"],
  },
  secondary: {
    DEFAULT: colors.neutral["50"],
  },
  tertiary: {
    hover: colors.neutral["50"],
  },
};

const brand= {
  primary: {
    hover: colors.primary["90"],
  },
  secondary: {
    hover: colors.primary["20"],
  },
}

exports.ringColor = {
  primary,
  neutral,
  brand
};

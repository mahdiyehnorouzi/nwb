const fs = require('fs');
const path = require('path');

const { backgroundColor: darkBackgroundColor } = require('./themes/dark/background');
const { borderColor: darkBorderColor } = require('./themes/dark/border');
const { textColor: darkTextColor } = require('./themes/dark/text');
const { boxShadow: darkBoxShadow } = require('./themes/dark/boxShadow');
const { ringColor: darkRingColor } = require('./themes/dark/ringColor');

const { backgroundColor: lightBackgroundColor } = require('./themes/light/background');
const { borderColor: lightBorderColor } = require('./themes/light/border');
const { textColor: lightTextColor } = require('./themes/light/text');
const { boxShadow: lightBoxShadow } = require('./themes/light/boxShadow');
const { ringColor: lightRingColor } = require('./themes/light/ringColor');

function flatten(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object') {
      Object.assign(acc, flatten(value, newKey));
    } else {
      acc[newKey] = value;
    }

    return acc;
  }, {});
}

function toCssVars(tokens, typePrefix) {
  const flat = flatten(tokens, typePrefix);
  const vars = {};
  Object.entries(flat).forEach(([key, value]) => {
    vars[key] = value;
  });
  return vars;
}

const darkTokens = {
  ...toCssVars(darkBackgroundColor, 'background'),
  ...toCssVars(darkBorderColor, 'border'),
  ...toCssVars(darkTextColor, 'text'),
  ...toCssVars(darkBoxShadow, 'box-shadow'),
  ...toCssVars(darkRingColor, 'ring'),
  'text-primary': darkTextColor.neutral.primary.DEFAULT,
  'bg-primary': darkBackgroundColor.neutral.primary.DEFAULT,
  'bg-secondary': darkBackgroundColor.neutral.secondary.DEFAULT,
  'bg-tertiary': darkBackgroundColor.neutral.tertiary.DEFAULT,
  'bg-brand': darkBackgroundColor.brand.primary.DEFAULT,
  'border-primary': darkBorderColor.neutral.tertiary.DEFAULT,
  'border-brand': darkBorderColor.brand.primary.DEFAULT,
};

const lightTokens = {
  ...toCssVars(lightBackgroundColor, 'background'),
  ...toCssVars(lightBorderColor, 'border'),
  ...toCssVars(lightTextColor, 'text'),
  ...toCssVars(lightBoxShadow, 'box-shadow'),
  ...toCssVars(lightRingColor, 'ring'),
  'text-primary': lightTextColor.neutral.primary.DEFAULT,
  'bg-primary': lightBackgroundColor.neutral.primary.DEFAULT,
  'bg-secondary': lightBackgroundColor.neutral.secondary.DEFAULT,
  'bg-tertiary': lightBackgroundColor.neutral.tertiary.DEFAULT,
  'bg-brand': lightBackgroundColor.brand.primary.DEFAULT,
  'border-primary': lightBorderColor.neutral.tertiary.DEFAULT,
  'border-brand': lightBorderColor.brand.primary.DEFAULT,
};

function generateThemeBlock(tokens, selector) {
  let css = `${selector} {\n`;
  Object.entries(tokens).forEach(([key, value]) => {
    css += `  --n-${key}: ${value};\n`;
  });
  css += '}\n';
  return css;
}

const css = generateThemeBlock(lightTokens, ':root') + generateThemeBlock(darkTokens, ':root.dark, :root[data-theme="dark"]');

const outputPath = path.resolve(__dirname, '../tokens.css');
fs.writeFileSync(outputPath, css);

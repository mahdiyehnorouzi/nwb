import { Config } from '@stencil/core';
import { postcss } from "@stencil-community/postcss";

export const config: Config = {
  namespace: 'nwb',
  globalStyle: 'src/global/global.css',
  plugins: [
    postcss({
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer')
      ],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: '/tailwind.config.js', dest: 'tailwind-config.js' }
      ]
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
};

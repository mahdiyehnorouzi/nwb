import { Config } from '@stencil/core';
import { postcss } from "@stencil-community/postcss";
import { resolve } from 'path';

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
        { src: resolve(process.cwd(), 'tailwind.config.js'), dest: 'build/tailwind-config.js', warn: true },
        { src: 'index.css', dest: 'index.css', warn: true },
        { src: 'test', dest: 'test', warn: true }
      ]
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
};

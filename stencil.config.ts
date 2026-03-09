import { Config } from '@stencil/core';
import { postcss } from "@stencil-community/postcss";
import { resolve } from 'path';

// TODO [MONOREPO]: When migrating to monorepo structure:
// - Move this to packages/components/stencil.config.ts
// - Create workspace-level build orchestration with Nx
// - Enable parallel builds across packages with Nx's task runner
// - Add shared build configuration in root
// - Use nx.json to configure build dependencies

export const config: Config = {
  namespace: 'nwb',
  // NOTE: Global styles loaded for all components - impacts initial load time
  // Consider: Component-scoped styles for better tree-shaking
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

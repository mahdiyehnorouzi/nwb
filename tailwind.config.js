/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./src/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Simple aliases
        'bg-primary': 'var(--n-bg-primary)',
        'bg-secondary': 'var(--n-bg-secondary)',
        'bg-tertiary': 'var(--n-bg-tertiary)',
        'bg-brand': 'var(--n-bg-brand)',
        'text-primary': 'var(--n-text-primary)',
        'border-primary': 'var(--n-border-primary)',
        'border-brand': 'var(--n-border-brand)',

        // Component colors - Background
        'brand-primary': 'var(--n-background-brand-primary-DEFAULT)',
        'brand-primary-hover': 'var(--n-background-brand-primary-hover)',
        'brand-primary-press': 'var(--n-background-brand-primary-press)',
        'brand-primary-disable': 'var(--n-background-brand-primary-disable)',
        'brand-secondary': 'var(--n-background-brand-secondary-DEFAULT)',
        'brand-secondary-hover': 'var(--n-background-brand-secondary-hover)',
        'brand-secondary-press': 'var(--n-background-brand-secondary-press)',
        'brand-quaternary': 'var(--n-background-brand-quaternary-DEFAULT)',
        'critical-primary': 'var(--n-background-critical-primary-DEFAULT)',
        'critical-primary-hover': 'var(--n-background-critical-primary-hover)',
        'critical-primary-press': 'var(--n-background-critical-primary-press)',
        'critical-secondary': 'var(--n-background-critical-secondary-DEFAULT)',
        'neutral-primary': 'var(--n-background-neutral-primary-DEFAULT)',
        'neutral-primary-press': 'var(--n-background-neutral-primary-press)',
        'neutral-quinary': 'var(--n-background-neutral-quinary-DEFAULT)',
        'neutral-quinary-hover': 'var(--n-background-neutral-quinary-hover)',
        'neutral-quinary-press': 'var(--n-background-neutral-quinary-press)',
        'neutral-secondary': 'var(--n-background-neutral-secondary-DEFAULT)',
        'neutral-secondary-hover': 'var(--n-background-neutral-secondary-hover)',
        'neutral-secondary-press': 'var(--n-background-neutral-secondary-press)',
        'neutral-tertiary': 'var(--n-background-neutral-tertiary-DEFAULT)',
        'neutral-quaternary': 'var(--n-background-neutral-quaternary-DEFAULT)',
        'neutral-quaternary-disable': 'var(--n-background-neutral-quaternary-disable)',
        'alpha-neutral-primary': 'var(--n-background-alpha-neutral-primary)',
        'disable-matt': 'var(--n-background-disable-matt)',
        'disable-bright': 'var(--n-background-disable-bright)',

        // Component colors - Text
        'text-neutral-quaternary': 'var(--n-text-neutral-quaternary-DEFAULT)',
        'text-neutral-quaternary-hover': 'var(--n-text-neutral-quaternary-hover)',
        'text-brand-primary': 'var(--n-text-brand-primary-DEFAULT)',
        'text-brand-primary-hover': 'var(--n-text-brand-primary-hover)',
        'text-brand-primary-press': 'var(--n-text-brand-primary-press)',
        'text-brand-secondary': 'var(--n-text-brand-secondary-DEFAULT)',
        'text-brand-quaternary': 'var(--n-text-brand-quaternary-DEFAULT)',
        'text-brand-quaternary-hover': 'var(--n-text-brand-quaternary-hover)',
        'text-brand-quaternary-press': 'var(--n-text-brand-quaternary-press)',
        'text-critical-primary': 'var(--n-text-critical-primary-DEFAULT)',
        'text-critical-primary-hover': 'var(--n-text-critical-primary-hover)',
        'text-critical-primary-press': 'var(--n-text-critical-primary-press)',
        'text-critical-secondary': 'var(--n-text-critical-secondary-DEFAULT)',
        'text-neutral-primary': 'var(--n-text-neutral-primary-DEFAULT)',
        'text-neutral-primary-hover': 'var(--n-text-neutral-primary-hover)',
        'text-neutral-primary-press': 'var(--n-text-neutral-primary-press)',
        'text-neutral-secondary': 'var(--n-text-neutral-secondary-DEFAULT)',
        'text-neutral-secondary-hover': 'var(--n-text-neutral-secondary-hover)',
        'text-neutral-secondary-press': 'var(--n-text-neutral-secondary-press)',
        'text-disable-bright': 'var(--n-text-disable-bright)',
        'text-warning-primary': 'var(--n-text-warning-primary-DEFAULT)',
        'text-warning-primary-hover': 'var(--n-text-warning-primary-hover)',
        'text-warning-primary-press': 'var(--n-text-warning-primary-press)',
        'text-blue-primary': 'var(--n-text-blue-primary-DEFAULT)',
        'text-blue-primary-hover': 'var(--n-text-blue-primary-hover)',
        'text-blue-primary-press': 'var(--n-text-blue-primary-press)',
        'text-neutral-quaternary': 'var(--n-text-neutral-quaternary-DEFAULT)',
        'text-neutral-quaternary-hover': 'var(--n-text-neutral-quaternary-hover)',
        'text-neutral-quaternary-press': 'var(--n-text-neutral-quaternary-press)',

        // Component colors - Border
        'border-brand-primary': 'var(--n-border-brand-primary-DEFAULT)',
        'border-brand-primary-hover': 'var(--n-border-brand-primary-hover)',
        'border-brand-primary-press': 'var(--n-border-brand-primary-press)',
        'border-critical-primary': 'var(--n-border-critical-primary-DEFAULT)',
        'border-critical-primary-hover': 'var(--n-border-critical-primary-hover)',
        'border-critical-primary-press': 'var(--n-border-critical-primary-press)',
        'border-neutral-quaternary': 'var(--n-border-neutral-quaternary-DEFAULT)',
        'border-neutral-quaternary-hover': 'var(--n-border-neutral-quaternary-hover)',
        'border-neutral-quaternary-press': 'var(--n-border-neutral-quaternary-press)',
        'border-disable-matt': 'var(--n-border-disable-matt)',
        'border-neutral-tertiary': 'var(--n-border-neutral-tertiary-DEFAULT)',
        'border-neutral-tertiary-hover': 'var(--n-border-neutral-tertiary-hover)',
        'border-neutral-tertiary-press': 'var(--n-border-neutral-tertiary-press)',
        'border-blue-primary': 'var(--n-border-blue-primary-DEFAULT)',
        'border-blue-primary-hover': 'var(--n-border-blue-primary-hover)',
        'border-blue-primary-press': 'var(--n-border-blue-primary-press)',
        'border-warning-primary': 'var(--n-border-warning-primary-DEFAULT)',
        'border-warning-primary-hover': 'var(--n-border-warning-primary-hover)',
        'border-warning-primary-press': 'var(--n-border-warning-primary-press)',
        
        // Warning colors
        'warning-primary': 'var(--n-background-warning-primary-DEFAULT)',
        'warning-primary-hover': 'var(--n-background-warning-primary-hover)',
        'warning-primary-press': 'var(--n-background-warning-primary-press)',
        'warning-secondary': 'var(--n-background-warning-secondary-DEFAULT)',
        'warning-secondary-hover': 'var(--n-background-warning-secondary-hover)',
        'warning-secondary-press': 'var(--n-background-warning-secondary-press)',
        
        // Blue colors (using tokens)
        'blue-20': 'var(--n-background-blue-secondary-DEFAULT)',
        'blue-30': 'var(--n-background-blue-secondary-hover)',
        'blue-40': 'var(--n-background-blue-secondary-press)',
        'blue-60': 'var(--n-background-blue-primary-hover)',
        'blue-80': 'var(--n-background-blue-primary-press)',
        'blue-140': 'var(--n-text-blue-primary-DEFAULT)',
        'blue-150': 'var(--n-text-blue-primary-hover)',
        'blue-170': 'var(--n-text-blue-primary-press)',
      },
      boxShadow: {
        'mini': 'var(--n-box-shadow-mini)',
        'small': 'var(--n-box-shadow-small)',
        'medium': 'var(--n-box-shadow-medium)',
        'large': 'var(--n-box-shadow-large)',
        'inset': 'var(--n-box-shadow-inset)',
        'maxi': 'var(--n-box-shadow-maxi)',
      },
      ringColor: {
        'primary': 'var(--n-ring-primary-DEFAULT)',
        'neutral-primary': 'var(--n-ring-neutral-primary-DEFAULT)',
        'neutral-secondary': 'var(--n-ring-neutral-secondary-DEFAULT)',
        'neutral-tertiary-hover': 'var(--n-ring-neutral-tertiary-hover)',
        'brand-primary-hover': 'var(--n-ring-brand-primary-hover)',
      },
      fontSize: {
        'o': ['10px', { lineHeight: '14px' }], // overline
        'c1': ['12px', { lineHeight: '16px' }], // caption1
        'b': ['14px', { lineHeight: '20px' }], // body
        'h2': ['20px', { lineHeight: '28px' }], // heading2
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
}
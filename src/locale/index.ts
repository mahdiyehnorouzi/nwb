import fa from './lang/fa-IR';
import en from './lang/en-US';

export type Message = Record<string, any>;
export type Messages = Record<string, Message>;

//  STATE MANAGEMENT: Module-level mutable state
// Issues:
// 1. Not reactive - components won't update on locale change
// 2. Shared across all instances (good for i18n, but not reactive)
// 3. No way to trigger re-renders when locale changes
//
// TODO: Consider implementing with:
// - Stencil Store for reactivity
// - Context API for propagation
// - Event system to notify components
let lang: string = 'fa';
const messages: Messages = { fa, en };

const api = {
  messages(): Message {
    return messages[lang];
  },

  getLocale(): string {
    return lang;
  },

  setLocale(locale: string, localeMessages?: Message): void {
    lang = locale;

    // TODO: Emit event or trigger reactivity when locale changes
    // Currently components using this won't re-render
    // Consider: window.dispatchEvent(new CustomEvent('locale-changed', { detail: locale }))
    if (!messages[locale] && localeMessages) {
      messages[locale] = localeMessages;
    }
  },
};

export default api;

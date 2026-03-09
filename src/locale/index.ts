import fa from './lang/fa-IR';
import en from './lang/en-US';
import { createStore } from '@stencil/store';

export type Message = Record<string, any>;
export type Messages = Record<string, Message>;

const { state, onChange } = createStore({
  lang: 'fa',
  messages: { fa, en } as Messages,
});

const api = {
  messages(): Message {
    return state.messages[state.lang] ?? state.messages.fa;
  },

  getLocale(): string {
    return state.lang;
  },

  setLocale(locale: string, localeMessages?: Message): void {
    state.lang = locale;

    if (!state.messages[locale] && localeMessages) {
      state.messages = {
        ...state.messages,
        [locale]: localeMessages,
      };
    }

    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(
          new CustomEvent('locale-changed', { detail: locale }),
        );
      } catch {
        // ignore dispatch errors
      }
    }
  },

  subscribe(listener: (locale: string) => void): () => void {
    listener(state.lang);
    return onChange('lang', (nextLocale) => listener(nextLocale));
  },
};

export default api;

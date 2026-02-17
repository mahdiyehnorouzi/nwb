import fa from './lang/fa-IR';
import en from './lang/en-US';

export type Message = Record<string, any>;
export type Messages = Record<string, Message>;

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

    if (!messages[locale] && localeMessages) {
      messages[locale] = localeMessages;
    }
  },
};

export default api;

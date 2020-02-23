type ColorKey = {
  [key: string]: string;
};

const languageColorKey: ColorKey = {
  html: "#e34c26",
  css: "#563c7c",
  ruby: "#701516"
};

export const getLanguageColor = (language: string): string =>
  languageColorKey[language.toLowerCase()];

import React, { useContext, useState } from "react";
import strings from "assets/strings";

const LocalizedStringsContext = React.createContext({});

const LocalizedStringsProvider = ({ children }) => {
  const [lang, setLang] = useState(strings.getLanguage());
  
  const setLanguage = (language) => {
    strings.setLanguage(language);
    setLang(language);
  };

  const getLanguage = () => {
    return strings.getLanguage();
  };
  return (
    <LocalizedStringsContext.Provider
      value={{ strings, setLanguage, getLanguage }}
    >
      {children}
    </LocalizedStringsContext.Provider>
  );
};

export const useLocalizedStrings = () => {
  const strings = useContext(LocalizedStringsContext);
  if (!strings) {
    console.log("useStrings needs to be used inside StringsContext");
  }
  return strings;
};

export default LocalizedStringsProvider;

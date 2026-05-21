import React, { createContext, useContext, useState } from 'react';

type TextSize = 'Small' | 'Medium' | 'Large';

type SettingsContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  sound: boolean;
  setSound: (value: boolean) => void;
  textSize: TextSize;
  setTextSize: (value: TextSize) => void;
  fontSize: number;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [sound, setSound] = useState(true);
  const [textSize, setTextSize] = useState<TextSize>('Medium');

  const fontSize =
    textSize === 'Small' ? 14 :
    textSize === 'Large' ? 22 :
    17;

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        sound,
        setSound,
        textSize,
        setTextSize,
        fontSize,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }

  return context;
}
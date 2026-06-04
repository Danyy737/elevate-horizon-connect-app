import { Audio } from 'expo-av';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

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

  const musicRef = useRef<Audio.Sound | null>(null);

  const fontSize =
    textSize === 'Small' ? 14 :
    textSize === 'Large' ? 22 :
    17;

  useEffect(() => {
    async function setupMusic() {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        const { sound: music } = await Audio.Sound.createAsync(
          require('../../assets/audio/Hello.mp3'),
          {
            shouldPlay: sound,
            isLooping: true,
            volume: 0.4,
          }
        );

        musicRef.current = music;
      } catch (error) {
        console.log('Music setup failed:', error);
      }
    }

    setupMusic();

    return () => {
      if (musicRef.current) {
        musicRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    async function updateMusic() {
      if (!musicRef.current) return;

      if (sound) {
        await musicRef.current.playAsync();
      } else {
        await musicRef.current.pauseAsync();
      }
    }

    updateMusic();
  }, [sound]);

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
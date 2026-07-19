import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TextSize = 'normal' | 'large' | 'extra-large';
export type ContrastMode = 'normal' | 'high';
export type MotionPreference = 'normal' | 'reduced';
export type AccessibilityMode = 'auslan' | 'easyRead' | 'plainLanguage';

interface PreferenceState {
  accessibilityMode: AccessibilityMode;
  textSize: TextSize;
  contrastMode: ContrastMode;
  motionPreference: MotionPreference;
  setAccessibilityMode: (mode: AccessibilityMode) => void;
  setTextSize: (size: TextSize) => void;
  setContrastMode: (mode: ContrastMode) => void;
  setMotionPreference: (pref: MotionPreference) => void;
}

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      accessibilityMode: 'plainLanguage',
      textSize: 'normal',
      contrastMode: 'normal',
      motionPreference: 'normal',
      setAccessibilityMode: (mode) => set({ accessibilityMode: mode }),
      setTextSize: (size) => set({ textSize: size }),
      setContrastMode: (mode) => set({ contrastMode: mode }),
      setMotionPreference: (pref) => set({ motionPreference: pref }),
    }),
    {
      name: 'dct-preference-storage', // Key in localStorage
    }
  )
);

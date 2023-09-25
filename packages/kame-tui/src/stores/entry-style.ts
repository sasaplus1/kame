import type { TextProps } from 'ink';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// NOTE: avoid TS2742
type TextPropsWithoutTypeFest = Omit<TextProps, 'backgroundColor' | 'color'>;

export type TextStyle = Partial<
  {
    backgroundColor: string;
    color: string;
  } & Omit<TextPropsWithoutTypeFest, 'children' | 'wrap'>
>;

export type Store = {
  baseStyle: TextStyle;
  focusedBaseStyle: TextStyle;
  selectedBaseStyle: TextStyle;
  cursorStyle: TextStyle;
  markerStyle: TextStyle;
  entryStyle: TextStyle;
  modeStyle: TextStyle;
  sizeStyle: TextStyle;
  dateStyle: TextStyle;
  setBaseStyle: (style: TextStyle) => void;
  setFocusedBaseStyle: (style: TextStyle) => void;
  setSelectedBaseStyle: (style: TextStyle) => void;
  setCursorStyle: (style: TextStyle) => void;
  setMarkerStyle: (style: TextStyle) => void;
  setEntryStyle: (style: TextStyle) => void;
  setModeStyle: (style: TextStyle) => void;
  setSizeStyle: (style: TextStyle) => void;
  setDateStyle: (style: TextStyle) => void;
};

export const useEntryStyleStore = create<Store>()(
  immer((set) => ({
    baseStyle: {},
    focusedBaseStyle: {},
    selectedBaseStyle: {},
    cursorStyle: {},
    markerStyle: {},
    entryStyle: {},
    modeStyle: {},
    sizeStyle: {},
    dateStyle: {},
    setBaseStyle: (style: TextStyle) => {
      set((state) => {
        state.baseStyle = style;
      });
    },
    setFocusedBaseStyle: (style: TextStyle) => {
      set((state) => {
        state.focusedBaseStyle = style;
      });
    },
    setSelectedBaseStyle: (style: TextStyle) => {
      set((state) => {
        state.selectedBaseStyle = style;
      });
    },
    setCursorStyle: (style: TextStyle) => {
      set((state) => {
        state.cursorStyle = style;
      });
    },
    setMarkerStyle: (style: TextStyle) => {
      set((state) => {
        state.markerStyle = style;
      });
    },
    setEntryStyle: (style: TextStyle) => {
      set((state) => {
        state.entryStyle = style;
      });
    },
    setModeStyle: (style: TextStyle) => {
      set((state) => {
        state.modeStyle = style;
      });
    },
    setSizeStyle: (style: TextStyle) => {
      set((state) => {
        state.sizeStyle = style;
      });
    },
    setDateStyle: (style: TextStyle) => {
      set((state) => {
        state.dateStyle = style;
      });
    }
  }))
);

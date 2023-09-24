import type { ImmerStateCreator } from './type';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Entry = {
  id: string;
  entry: string;
  mode: string;
  size: string;
  date: string;
};

export type Slice = {
  cursorEntry: Entry | null;
  entries: Entry[];
  filter: string;
  isFocused: boolean;
  markedEntries: Entry[];
  path: string;
  setCursorEntry: (entry: Entry | null) => void;
  setEntries: (entries: Entry[]) => void;
  setFilter: (filter: string) => void;
  setFocus: (focus: boolean) => void;
  setMarkedEntries: (entries: Entry[]) => void;
  setPath: (path: string) => void;
};

const createSlice: ImmerStateCreator<Slice> = (set) => {
  return {
    cursorEntry: null,
    entries: [],
    filter: '',
    isFocused: false,
    markedEntries: [],
    path: '',
    setCursorEntry(entry) {
      set((state) => {
        state.cursorEntry = entry;
      });
    },
    setEntries(entries) {
      set((state) => {
        state.entries = entries;
      });
    },
    setFilter(filter) {
      set((state) => {
        state.filter = filter;
      });
    },
    setFocus(focus) {
      set((state) => {
        state.isFocused = focus;
      });
    },
    setMarkedEntries(entries) {
      set((state) => {
        state.markedEntries = entries;
      });
    },
    setPath(path) {
      set((state) => {
        state.path = path;
      });
    }
  };
};

export const useEntryViewStores = [
  create<Slice>()(
    immer((...args) => ({
      ...createSlice(...args)
    }))
  ),
  create<Slice>()(
    immer((...args) => ({
      ...createSlice(...args)
    }))
  )
] as const;

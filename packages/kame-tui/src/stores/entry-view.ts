import type { ImmerStateCreator } from './slice';
import type { TextStyle } from './style';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type EntryId = string;

export type Store = {
  pathStyle: TextStyle;
  focusedPathStyle: TextStyle;
  setPathStyle: (style: TextStyle) => void;
  setFocusedPathStyle: (style: TextStyle) => void;
};

/** store for EntryView */
export const useEntryViewStore = create<Store>()(
  immer((set) => ({
    pathStyle: { color: 'blue' },
    focusedPathStyle: { color: 'red', bold: true },
    setPathStyle(style) {
      set((state) => {
        state.pathStyle = style;
      });
    },
    setFocusedPathStyle(style) {
      set((state) => {
        state.focusedPathStyle = style;
      });
    }
  }))
);

export type Entry = {
  id: EntryId;
  entry: string;
  mode: string;
  size: string;
  date: string;
};

export type Slice = {
  cursor: EntryId | null;
  entries: Entry[];
  filter: string;
  focused: boolean;
  marks: EntryId[];
  path: string;
  setCursor: (entryId: EntryId | null) => void;
  setEntries: (entries: Entry[]) => void;
  setFilter: (filter: string) => void;
  setFocused: (focus: boolean) => void;
  setMarks: (entryIds: EntryId[]) => void;
  setPath: (path: string) => void;
};

const createSlice: ImmerStateCreator<Slice> = (set) => {
  return {
    cursor: null,
    entries: [],
    filter: '',
    focused: false,
    marks: [],
    path: '',
    setCursor(id) {
      set((state) => {
        state.cursor = id;
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
    setFocused(focus) {
      set((state) => {
        state.focused = focus;
      });
    },
    setMarks(entryIds) {
      set((state) => {
        state.marks = entryIds;
      });
    },
    setPath(path) {
      set((state) => {
        state.path = path;
      });
    }
  };
};

/** store for primary EntryView */
export const usePrimaryEntryViewStore = create<Slice>()(
  immer((...args) => ({
    ...createSlice(...args)
  }))
);
/** store for secondary EntryView */
export const useSecondaryEntryViewStore = create<Slice>()(
  immer((...args) => ({
    ...createSlice(...args)
  }))
);

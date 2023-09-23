import type { Props as EntryViewProps } from '../components/EntryView';
import type { ImmerStateCreator } from './index';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Entry = EntryViewProps['entries'][number];

export type Slice = {
  cursorEntry: Entry | null;
  entries: Entry[];
  path: string;
  setCursorEntry: (entry: Entry) => void;
  setEntries: (entries: Entry[]) => void;
  setPath: (path: string) => void;
};

const createSlice: ImmerStateCreator<Slice> = (set) => {
  return {
    cursorEntry: null,
    entries: [],
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

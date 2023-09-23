import type { StateCreator } from 'zustand';

/**
 * @see {@link https://github.com/pmndrs/zustand/discussions/1796}
 * @see {@link https://codesandbox.io/s/zustand-updating-draft-states-and-slice-pattern-basic-demo-3e9zby?file=/src/App.tsx}
 */
export type ImmerStateCreator<T> = StateCreator<
  T,
  [['zustand/immer', never], never],
  [],
  T
>;

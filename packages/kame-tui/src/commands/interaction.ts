import type { Slice as EntryViewStore } from '../stores/entry-view';

import * as path from 'node:path';
import { getEntries } from 'kame-core';
import {
  usePrimaryEntryViewStore,
  useSecondaryEntryViewStore
} from '../stores/entry-view';
import { getEntryData } from '../utilities/entry';

function getActiveEntryView(stores: EntryViewStore[]) {
  return stores.find((s) => s.focused);
}

type MoveCursorParams = {
  position: 'first' | 'last';
};

export function moveCursor(params: MoveCursorParams) {
  const { position } = params;

  const primaryEntryViewState = usePrimaryEntryViewStore.getState();
  const secondaryEntryViewState = useSecondaryEntryViewStore.getState();

  const activeState = getActiveEntryView([
    primaryEntryViewState,
    secondaryEntryViewState
  ]);

  if (!activeState) {
    return;
  }

  const { entries } = activeState;

  const entry = entries.at(position === 'first' ? 0 : -1);
  const id = entry?.id || null;

  activeState.setCursor(id);
}

type MoveCursorToPreviousParams = {
  loop: boolean;
};

/** */
export function moveCursorToPrevious(
  params: MoveCursorToPreviousParams = { loop: false }
) {
  const { loop } = params;

  const primaryEntryViewState = usePrimaryEntryViewStore.getState();
  const secondaryEntryViewState = useSecondaryEntryViewStore.getState();

  const activeState = getActiveEntryView([
    primaryEntryViewState,
    secondaryEntryViewState
  ]);

  if (!activeState) {
    return;
  }

  const { cursor, entries } = activeState;

  const index = entries.findIndex((entry) => cursor === entry.id);

  if (!loop && index - 1 < 0) {
    return;
  }

  const entry = entries.at(index - 1);
  const id = entry?.id || null;

  activeState.setCursor(id);
}

type MoveCursorToNextParams = {
  loop: boolean;
};

/** */
export function moveCursorToNext(
  params: MoveCursorToNextParams = { loop: false }
) {
  const { loop } = params;

  const primaryEntryViewState = usePrimaryEntryViewStore.getState();
  const secondaryEntryViewState = useSecondaryEntryViewStore.getState();

  const activeState = getActiveEntryView([
    primaryEntryViewState,
    secondaryEntryViewState
  ]);

  if (!activeState) {
    return;
  }

  const { cursor, entries } = activeState;

  const index = entries.findIndex((entry) => cursor === entry.id);

  if (!loop && index + 1 >= entries.length) {
    return;
  }

  const entry = entries.at(index + 1 === entries.length ? 0 : index + 1);
  const id = entry?.id || null;

  activeState.setCursor(id);
}

/** */
export function switchActiveEntryView(): void {
  const primaryEntryViewState = usePrimaryEntryViewStore.getState();
  const secondaryEntryViewState = useSecondaryEntryViewStore.getState();

  primaryEntryViewState.setFocused(!primaryEntryViewState.focused);
  secondaryEntryViewState.setFocused(!secondaryEntryViewState.focused);
}

type ChangeDirectoryParams = {
  direction: 'up' | 'down';
};

export async function changeDirectory(
  params: ChangeDirectoryParams
): Promise<void> {
  const { direction } = params;

  const primaryEntryViewState = usePrimaryEntryViewStore.getState();
  const secondaryEntryViewState = useSecondaryEntryViewStore.getState();

  const activeState = getActiveEntryView([
    primaryEntryViewState,
    secondaryEntryViewState
  ]);

  if (!activeState) {
    return;
  }

  const dir =
    direction === 'up'
      ? '..'
      : activeState.entries.find((entry) => activeState.cursor === entry.id)
          ?.entry;

  if (!dir) {
    return;
  }

  const oldPath = activeState.path;
  const newPath = path.join(activeState.path, dir);

  if (oldPath === newPath) {
    return;
  }

  activeState.setPath(newPath);

  const entries = await getEntries(newPath);
  const promises = entries.map(
    async (entry) => await getEntryData(path.resolve(newPath, entry))
  );

  const a = await Promise.all(promises);

  activeState.setEntries(a);
  activeState.setCursor(a.at(0)?.id || null);
}

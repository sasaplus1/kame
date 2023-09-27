import { useApp, useInput } from 'ink';
import * as React from 'react';
import {
  usePrimaryEntryViewStore,
  useSecondaryEntryViewStore
} from '../stores/entry-view';
import {
  moveCursor,
  moveCursorToNext,
  moveCursorToPrevious,
  switchActiveEntryView,
  changeDirectory
} from './interaction';

type InputHandler = Parameters<typeof useInput>[0];

export type Props = {
  children: React.ReactNode;
};

/***/
export function Command(props: Props) {
  const { exit } = useApp();

  const primaryEntryViewState = usePrimaryEntryViewStore((state) => state);
  const secondaryEntryViewState = useSecondaryEntryViewStore((state) => state);

  const onInput = React.useCallback<InputHandler>(
    async (input, key) => {
      if (input === 'q') {
        return void exit();
      }
      if (key.tab) {
        return void switchActiveEntryView();
      }
      // TODO: gg
      if (input === 'g') {
        return void moveCursor({ position: 'first' });
      }
      if (input === 'G') {
        return void moveCursor({ position: 'last' });
      }
      if (input === 'k' /* C-p, up */) {
        return void moveCursorToPrevious({ loop: true });
      }
      if (input === 'j' /* C-n, down */) {
        return void moveCursorToNext({ loop: true });
      }
      if (input === 'h') {
        return void (await changeDirectory({ direction: 'up' }));
      }
      if (input === 'l') {
        return void (await changeDirectory({ direction: 'down' }));
      }
      // mark
      // if (space) {
      // }
      // copy file(s)
      // if (input === 'C') {
      // }
      // remove file(s)
      // if (input === 'D') {
      // }
      // ?
      // if (input === 'J') {
      // }
      // create directory
      // if (input === 'K') {
      // }
      // move file(s)
      // if (input === 'M') {
      // }
      // new file
      // if (input === 'N') {
      // }
      // move to primary
      // if (input === 'P') {
      // }
      // rename
      // if (input === 'R') {
      // }
      // move to secondary
      // if (input === 'S') {
      // }
      // mask
      // if (input === ';') {
      // }
    },
    [exit, primaryEntryViewState, secondaryEntryViewState]
  );

  useInput(onInput);

  return <React.Fragment>{props.children}</React.Fragment>;
}

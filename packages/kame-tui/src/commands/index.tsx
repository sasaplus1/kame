import { useApp, useInput } from 'ink';
import * as React from 'react';
import { useEntryViewStores } from '../stores/entry-view';

type InputHandler = Parameters<typeof useInput>[0];

export type Props = {
  children: React.ReactNode;
};

/***/
export function Command(props: Props) {
  const { exit } = useApp();

  const [L, R] = useEntryViewStores;
  const entryViewStateL = L((state) => state);
  const entryViewStateR = R((state) => state);

  const onInput = React.useCallback<InputHandler>(
    (input, key) => {
      if (input === 'q') {
        return void exit();
      }
      if (key.tab) {
        entryViewStateL.setFocus(!entryViewStateL.isFocused);
        entryViewStateR.setFocus(!entryViewStateR.isFocused);
        return;
      }
      // TODO: gg, G
      if (input === 'k' /* C-p, up */) {
        return;
      }
      if (input === 'j' /* C-n, down */) {
        return;
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
    [exit, entryViewStateL, entryViewStateR]
  );

  useInput(onInput);

  return <React.Fragment>{props.children}</React.Fragment>;
}

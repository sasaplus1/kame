import type { BoxProps } from 'ink';

import { useFullscreen, useResize } from '@sasaplus1/ink-hooks';
import { Box } from 'ink';
import * as React from 'react';
import { EntryView } from '../EntryView';
import { useEntryViewStores } from '../../stores/entry-view';

export type Props = {
  // TODO: left and right
  cwd: string;
};

const border: Pick<
  BoxProps,
  'borderTop' | 'borderLeft' | 'borderRight' | 'borderBottom' | 'borderStyle'
> = {
  borderStyle: 'single',
  borderTop: false,
  borderLeft: true,
  borderRight: false,
  borderBottom: false
};

export function Kame(props: Props) {
  const { cwd } = props;
  cwd;

  useFullscreen();

  const { width, height } = useResize();

  const [L, R] = useEntryViewStores;

  const entryViewStateL = L((state) => state);
  const entryViewStateR = R((state) => state);

  return (
    <React.Fragment>
      <Box width={width} height={height}>
        <EntryView
          entries={entryViewStateL.entries}
          isFocused={entryViewStateL.isFocused}
          path={entryViewStateL.path}
        />
        <EntryView
          entries={entryViewStateR.entries}
          isFocused={entryViewStateR.isFocused}
          path={entryViewStateR.path}
          {...border}
        />
      </Box>
      {/* some panels here */}
    </React.Fragment>
  );
}

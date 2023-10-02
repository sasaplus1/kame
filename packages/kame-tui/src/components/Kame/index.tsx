import type { BoxProps } from 'ink';

import { useFullscreen, useResize } from '@sasaplus1/ink-hooks';
import { Box, Text } from 'ink';
import * as React from 'react';
import { EntryView } from '../EntryView';
import {
  usePrimaryEntryViewStore,
  useSecondaryEntryViewStore
} from '../../stores/entry-view';

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

  const primaryEntryViewState = usePrimaryEntryViewStore((state) => state);
  const secondaryEntryViewState = useSecondaryEntryViewStore((state) => state);

  const primaryEntries = React.useMemo(() => {
    return primaryEntryViewState.entries.map((entry) => ({
      ...entry,
      key: entry.id
    }));
  }, [primaryEntryViewState.entries]);
  const secondaryEntries = React.useMemo(() => {
    return secondaryEntryViewState.entries.map((entry) => ({
      ...entry,
      key: entry.id
    }));
  }, [secondaryEntryViewState.entries]);

  return (
    <Box width={width} height={height} flexDirection="column">
      <Box>
        <EntryView
          cursor={primaryEntryViewState.cursor}
          entries={primaryEntries}
          focused={primaryEntryViewState.focused}
          path={primaryEntryViewState.path}
        />
        <EntryView
          cursor={secondaryEntryViewState.cursor}
          entries={secondaryEntries}
          focused={secondaryEntryViewState.focused}
          path={secondaryEntryViewState.path}
          /* offset */
          {...border}
        />
      </Box>
      <Box
        minHeight={3}
        borderStyle="single"
        borderTop
        borderLeft={false}
        borderRight={false}
        borderBottom={false}
      >
        <Text>K: mkdir</Text>
      </Box>
    </Box>
  );
}

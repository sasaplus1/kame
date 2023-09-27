import type { BoxProps, DOMElement } from 'ink';
import type { Props as ScrollBoxProps } from '@sasaplus1/ink-scroll-box';
import type { Props as EntryProps } from '../Entry';
import type { EntryId } from '../../stores/entry-view';

import { Box, Text, measureElement } from 'ink';
import * as React from 'react';
import { shallow } from 'zustand/shallow';
import { innerWidth } from '@sasaplus1/ink-inner-sizes';
import { useResize } from '@sasaplus1/ink-hooks';
import { ScrollBox } from '@sasaplus1/ink-scroll-box';
import { Entry } from '../Entry';
import { useEntryViewStore } from '../../stores/entry-view';

export type Entry = Pick<EntryProps, 'entry' | 'mode' | 'size' | 'date'> & {
  id: EntryId;
  key: string;
};

export type Props = {
  cursor: EntryId | null;
  entries: Entry[];
  focused: boolean;
  path: string;
} & Partial<Pick<ScrollBoxProps, 'offset'>> &
  BoxProps;

export function EntryView(props: Props) {
  const { cursor, entries, focused, path, offset = 0, ...boxProps } = props;

  const ref = React.useRef<DOMElement>(null);

  const { columns } = useResize();

  // NOTE: initial width inject by props
  const [width, setWidth] = React.useState(process.stdout.columns);

  React.useLayoutEffect(() => {
    if (ref.current) {
      setWidth(innerWidth(measureElement(ref.current).width, boxProps));
    }
  }, [columns, boxProps]);

  const { pathStyle, focusedPathStyle } = useEntryViewStore(
    (state) => ({
      pathStyle: state.pathStyle,
      focusedPathStyle: state.focusedPathStyle
    }),
    shallow
  );

  return (
    <Box
      {...boxProps}
      ref={ref}
      flexDirection="column"
      width="100%"
      height="100%"
    >
      <Text
        {...pathStyle}
        {...(focused ? focusedPathStyle : {})}
        wrap="truncate-middle"
      >
        {path}
      </Text>
      <ScrollBox offset={offset} height="100%">
        {entries.map(({ id, key, ...entry }) => (
          <Entry {...entry} key={key} width={width} focused={cursor === id} />
        ))}
      </ScrollBox>
    </Box>
  );
}

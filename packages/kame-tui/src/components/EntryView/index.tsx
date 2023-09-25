import type { BoxProps, DOMElement } from 'ink';
import type { Props as ScrollBoxProps } from '@sasaplus1/ink-scroll-box';
import type { Props as EntryProps } from '../Entry';

import { Box, Text, measureElement } from 'ink';
import * as React from 'react';
import { innerWidth } from '@sasaplus1/ink-inner-sizes';
import { useResize } from '@sasaplus1/ink-hooks';
import { ScrollBox } from '@sasaplus1/ink-scroll-box';
import { Entry } from '../Entry';

type Entry = Pick<EntryProps, 'entry' | 'mode' | 'size' | 'date'> & {
  key: string;
};

export type Props = {
  entries: Entry[];
  isFocused: boolean;
  path: string;
} & Partial<Pick<ScrollBoxProps, 'offset'>> &
  BoxProps;

export function EntryView(props: Props) {
  const { entries, isFocused, path, offset = 0, ...boxProps } = props;

  const ref = React.useRef<DOMElement>(null);

  const { columns } = useResize();

  // NOTE: initial width inject by props
  const [width, setWidth] = React.useState(process.stdout.columns);

  React.useLayoutEffect(() => {
    if (ref.current) {
      setWidth(innerWidth(measureElement(ref.current).width, boxProps));
    }
  }, [columns, boxProps]);

  return (
    <Box
      {...boxProps}
      ref={ref}
      flexDirection="column"
      width="100%"
      height="100%"
    >
      <Text color="red" wrap="truncate-middle" dimColor={!isFocused}>
        {path}
      </Text>
      <ScrollBox offset={offset} height="100%">
        {entries.map(({ key, ...entry }) => (
          <Entry {...entry} key={key} width={width} />
        ))}
      </ScrollBox>
    </Box>
  );
}

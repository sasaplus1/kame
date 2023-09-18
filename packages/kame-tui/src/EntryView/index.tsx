import type { BoxProps, DOMElement, TextProps } from 'ink';
import type { Props as ScrollBoxProps } from '@sasaplus1/ink-scroll-box';
import type { Props as EntryProps } from '../Entry';

import { measureElement, Box, Text } from 'ink';
import * as React from 'react';
import { ScrollBox } from '@sasaplus1/ink-scroll-box';
import { Entry } from '../Entry';

export type ColorProps = 'color' | 'backgroundColor' | 'dimColor';
export type DecorationProps =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'inverse';
export type StyleProps = Pick<TextProps, ColorProps | DecorationProps>;

export type Props = {
  entries: (Omit<EntryProps, 'width'> & { key: string })[];
  path: string;
  pathStyles?: StyleProps;
} & Partial<Pick<ScrollBoxProps, 'offset'>> &
  BoxProps;

export function EntryView(props: Props) {
  const ref = React.useRef<DOMElement>(null);

  // NOTE: initial width inject by props
  const [width, setWidth] = React.useState(process.stdout.columns);

  React.useEffect(() => {
    if (ref.current) {
      setWidth(measureElement(ref.current).width);
    }
  }, []);

  const { entries, path, pathStyles, offset = 0, ...boxProps } = props;

  return (
    <Box
      {...boxProps}
      ref={ref}
      flexDirection="column"
      width="100%"
      height="100%"
    >
      <Text {...pathStyles}>{path}</Text>
      <ScrollBox offset={offset} height="100%">
        {entries.map(({ key, ...entry }) => (
          <Entry {...entry} key={key} width={width} />
        ))}
      </ScrollBox>
    </Box>
  );
}

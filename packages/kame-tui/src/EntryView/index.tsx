import type { DOMElement, TextProps } from 'ink';
import type { Props as EntryProps } from '../Entry';

import { measureElement, Box, Text } from 'ink';
import * as React from 'react';
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
  entries: Omit<EntryProps, 'width'>[];
  path: string;
  pathStyles?: StyleProps;
};

export function EntryView(props: Props) {
  const ref = React.useRef<DOMElement>(null);

  const [width, setWidth] = React.useState(process.stdout.columns);

  React.useEffect(() => {
    if (ref.current) {
      setWidth(measureElement(ref.current).width);
    }
  }, []);

  const { entries, path, pathStyles } = props;

  return (
    <Box ref={ref} flexDirection="column">
      <Text {...pathStyles}>{path}</Text>
      {entries.map((entry, index) => (
        <Entry
          {...entry}
          key={
            path + entry.entry + entry.mode + entry.size + entry.date + index
          }
          width={width}
        />
      ))}
    </Box>
  );
}

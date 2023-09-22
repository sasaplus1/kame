import type { TextProps } from 'ink';

import cliTruncate from 'cli-truncate';
import * as React from 'react';
import stringWidth from 'string-width';
import { Text } from 'ink';

export type ColorProps = 'color' | 'backgroundColor' | 'dimColor';
export type DecorationProps =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'inverse';
export type StyleProps = Pick<TextProps, ColorProps | DecorationProps>;

export type Props = {
  /** needs for spacer calculation */
  width: number;
} & {
  marker?: string;
  entry: string;
  mode: string;
  size: string;
  date: string;
} & {
  allStyles?: StyleProps;
  cursorStyles?: StyleProps;
  markerStyles?: StyleProps;
  entryStyles?: StyleProps;
  modeStyles?: StyleProps;
  sizeStyles?: StyleProps;
  dateStyles?: StyleProps;
};

/**
 * @privateRemarks
 * `<Box>` is cannot decorate
 */
export function Entry(props: Props) {
  const {
    width,
    marker = ' ',
    entry,
    mode,
    size,
    date,
    allStyles,
    cursorStyles,
    markerStyles,
    entryStyles,
    modeStyles,
    sizeStyles,
    dateStyles
  } = props;

  const cursor = ' ';

  const maxEntryLength = React.useMemo(
    () =>
      width -
      (cursor.length + marker.length + 1) -
      (2 + mode.length + 2 + size.length + 2 + date.length),
    [width, cursor.length, marker.length, mode.length, size.length, date.length]
  );

  const truncatedEntry = React.useMemo(
    () =>
      cliTruncate(entry, maxEntryLength, {
        position: 'middle'
      }),
    [entry, maxEntryLength]
  );

  const spaceLength = React.useMemo(
    () => maxEntryLength - stringWidth(truncatedEntry),
    [maxEntryLength, truncatedEntry]
  );

  const spacer = React.useMemo(
    () => ' '.repeat(spaceLength > 0 ? spaceLength : 0),
    [spaceLength]
  );

  return (
    <Text {...allStyles}>
      <Text {...allStyles} {...cursorStyles}>
        {cursor}
      </Text>
      <Text {...allStyles} {...markerStyles}>
        {marker}
      </Text>
      <Text> </Text>
      <Text {...allStyles} {...entryStyles}>
        {truncatedEntry}
      </Text>
      <Text>{spacer}</Text>
      <Text>{'  '}</Text>
      <Text {...allStyles} {...modeStyles}>
        {mode}
      </Text>
      <Text>{'  '}</Text>
      <Text {...allStyles} {...sizeStyles}>
        {size}
      </Text>
      <Text>{'  '}</Text>
      <Text {...allStyles} {...dateStyles}>
        {date}
      </Text>
    </Text>
  );
}

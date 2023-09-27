import cliTruncate from 'cli-truncate';
import * as React from 'react';
import stringWidth from 'string-width';
import { Text } from 'ink';
import { shallow } from 'zustand/shallow';
import { useEntryStore } from '../../stores/entry';

export type Props = {
  focused?: boolean;
  selected?: boolean;
  width: number;
} & {
  marker?: string;
  entry: string;
  mode: string;
  size: string;
  date: string;
};

/**
 * @privateRemarks
 * `<Box>` is cannot decorate
 */
export function Entry(props: Props) {
  const {
    focused = false,
    selected = false,
    width,
    marker = ' ',
    entry,
    mode,
    size,
    date
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

  const {
    baseStyle,
    focusedBaseStyle,
    selectedBaseStyle,
    cursorStyle,
    markerStyle,
    entryStyle,
    modeStyle,
    sizeStyle,
    dateStyle
  } = useEntryStore(
    (state) => ({
      baseStyle: state.baseStyle,
      focusedBaseStyle: state.focusedBaseStyle,
      selectedBaseStyle: state.selectedBaseStyle,
      cursorStyle: state.cursorStyle,
      markerStyle: state.markerStyle,
      entryStyle: state.entryStyle,
      modeStyle: state.modeStyle,
      sizeStyle: state.sizeStyle,
      dateStyle: state.dateStyle
    }),
    shallow
  );

  return (
    <Text
      {...baseStyle}
      {...(selected ? selectedBaseStyle : {})}
      {...(focused ? focusedBaseStyle : {})}
    >
      <Text {...baseStyle} {...cursorStyle}>
        {cursor}
      </Text>
      <Text {...baseStyle} {...markerStyle}>
        {marker}
      </Text>
      <Text> </Text>
      <Text {...baseStyle} {...entryStyle}>
        {truncatedEntry}
      </Text>
      <Text>{spacer}</Text>
      <Text>{'  '}</Text>
      <Text {...baseStyle} {...modeStyle}>
        {mode}
      </Text>
      <Text>{'  '}</Text>
      <Text {...baseStyle} {...sizeStyle}>
        {size}
      </Text>
      <Text>{'  '}</Text>
      <Text {...baseStyle} {...dateStyle}>
        {date}
      </Text>
    </Text>
  );
}

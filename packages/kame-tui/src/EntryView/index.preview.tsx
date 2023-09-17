#!/usr/bin/env node --no-warnings --loader tsx

import type { Props as EntryViewProps } from './index';

import * as React from 'react';
import { render, useApp, useInput, Box, Text } from 'ink';
import { EntryView } from './index';

const entries: EntryViewProps['entries'] = [
  {
    entry: 'file.txt',
    mode: '-rw-',
    size: '100 kB',
    date: '2023/09/17 00:05'
  },
  {
    marker: '+',
    entry: 'dir/',
    mode: 'drwx',
    size: '      ',
    date: '2023/09/17 00:05'
  },
  {
    entryStyles: { dimColor: true },
    entry: '.gitignore',
    mode: '-rw-',
    size: '100 kB',
    date: '2023/09/17 00:05'
  },
  {
    entry: `t${'o'.repeat(512)}-long-file.txt`,
    mode: '-rw-',
    size: '100 kB',
    date: '2023/09/17 00:05'
  },
  {
    entry:
      'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす.txt',
    mode: '-rw-',
    size: '100 kB',
    date: '2023/09/17 00:05'
  },
  {
    marker: '*',
    entry: 'file.txt',
    mode: '-rw-',
    size: '100 kB',
    date: '2023/09/17 00:05'
  },
  {
    allStyles: { bold: true, dimColor: true },
    entry: 'file.txt',
    mode: '-rw-',
    size: '100 kB',
    date: '2023/09/17 00:05'
  },
  {
    allStyles: { underline: true },
    entry: 'file.txt',
    mode: '-rw-',
    size: '100 kB',
    date: '2023/09/17 00:05'
  },
  {
    allStyles: { inverse: true },
    entry: 'file.txt',
    mode: '-rw-',
    size: '100 kB',
    date: '2023/09/17 00:05'
  },
  {
    cursorStyles: { backgroundColor: 'gray' },
    markerStyles: { color: 'green' },
    entryStyles: { color: 'red' },
    modeStyles: { color: 'green' },
    sizeStyles: { color: 'yellow' },
    dateStyles: { color: 'blue' },
    marker: '*',
    entry: 'file.txt',
    mode: '-rw-',
    size: '100 kB',
    date: '2023/09/17 00:05'
  },
  {
    allStyles: { dimColor: true },
    cursorStyles: { backgroundColor: 'gray' },
    markerStyles: { color: 'green' },
    entryStyles: { color: 'red' },
    modeStyles: { color: 'green' },
    sizeStyles: { color: 'yellow' },
    dateStyles: { color: 'blue' },
    marker: '*',
    entry: 'file.txt',
    mode: '-rw-',
    size: '100 kB',
    date: '2023/09/17 00:05'
  }
];

function App() {
  const { exit } = useApp();

  const [offset, setOffset] = React.useState(Math.trunc(entries.length / 2));

  useInput((input, key) => {
    if (input === 'q') {
      exit();
    }

    if (key.upArrow || input === 'k') {
      if (offset <= 0) {
        return;
      }

      setOffset((offset) => offset - 1);
    }

    if (key.downArrow || input === 'j') {
      if (offset >= entries.length - 1) {
        return;
      }

      setOffset((offset) => offset + 1);
    }
  });

  return (
    <React.Fragment>
      <Text bold>
        press q to exit | press up/down(or k/j) to change offset | offset:{' '}
        {offset}
      </Text>
      <Box flexDirection="column">
        <EntryView
          height={Math.trunc(entries.length + 1 / 2) /* entries.length + 1 */}
          path="/home/sasaplus1"
          pathStyles={{ bold: true }}
          offset={offset}
          entries={entries}
        />
      </Box>
    </React.Fragment>
  );
}

render(<App />);

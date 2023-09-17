#!/usr/bin/env node --no-warnings --loader tsx

import * as React from 'react';
import { render, useApp, useInput, Box, Text } from 'ink';
import { EntryView } from './index';

function App() {
  const { exit } = useApp();

  useInput((input) => {
    if (input === 'q') {
      exit();
    }
  });

  return (
    <React.Fragment>
      <Text bold>press q to exit</Text>
      <Box flexDirection="column">
        <EntryView
          path="/home/sasaplus1"
          pathStyles={{ bold: true }}
          entries={[
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
          ]}
        />
      </Box>
    </React.Fragment>
  );
}

render(<App />);

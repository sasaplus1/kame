#!/usr/bin/env node --no-warnings --loader tsx

import type { DOMElement } from 'ink';

import * as React from 'react';
import { measureElement, render, useApp, useInput, Box, Text } from 'ink';
import { Entry } from './index';

function App() {
  const { exit } = useApp();

  useInput((input) => {
    if (input === 'q') {
      exit();
    }
  });

  const ref = React.useRef<DOMElement>(null);
  const [width, setWidth] = React.useState(process.stdout.columns);

  React.useLayoutEffect(() => {
    if (ref.current) {
      setWidth(measureElement(ref.current).width);
    }
  }, []);

  return (
    <React.Fragment>
      <Text bold>press q to exit</Text>
      <Box ref={ref} flexDirection="column">
        <Entry
          entry="file.txt"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          marker="*"
          entry="file.txt"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          entry={`t${'o'.repeat(512)}-long-file.txt`}
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          entry="いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす.txt"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          marker="+"
          entry="dir/"
          mode="drwx"
          size="      "
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          focused
          entry="file.txt"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          selected
          entry="file.txt"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
      </Box>
    </React.Fragment>
  );
}

render(<App />);

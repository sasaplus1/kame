#!/usr/bin/env node --no-warnings --loader tsx

import type { DOMElement } from 'ink';

import * as React from 'react';
import { measureElement, render, useApp, useInput, Box, Text } from 'ink';
import { Entry } from './index';

function App() {
  const { exit } = useApp();

  const ref = React.useRef<DOMElement>(null);

  const [width, setWidth] = React.useState(process.stdout.columns);

  useInput((input) => {
    if (input === 'q') {
      exit();
    }
  });

  React.useEffect(() => {
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
          marker="+"
          entry="dir/"
          mode="drwx"
          size="      "
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          entryStyles={{ dimColor: true }}
          entry=".gitignore"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          entry={`t${'o'.repeat(100)}-long-file.txt`}
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
          marker="*"
          entry="file.txt"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          allStyles={{ bold: true, dimColor: true }}
          entry="file.txt"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          allStyles={{ underline: true }}
          entry="file.txt"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          allStyles={{ inverse: true }}
          entry="file.txt"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          cursorStyles={{ backgroundColor: 'gray' }}
          markerStyles={{ color: 'green' }}
          entryStyles={{ color: 'red' }}
          modeStyles={{ color: 'green' }}
          sizeStyles={{ color: 'yellow' }}
          dateStyles={{ color: 'blue' }}
          marker="*"
          entry="file.txt"
          mode="-rw-"
          size="100 kB"
          date="2023/09/17 00:05"
          width={width}
        />
        <Entry
          allStyles={{ dimColor: true }}
          cursorStyles={{ backgroundColor: 'gray' }}
          markerStyles={{ color: 'green' }}
          entryStyles={{ color: 'red' }}
          modeStyles={{ color: 'green' }}
          sizeStyles={{ color: 'yellow' }}
          dateStyles={{ color: 'blue' }}
          marker="*"
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

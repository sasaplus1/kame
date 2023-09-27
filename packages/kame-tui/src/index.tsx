import * as path from 'node:path';
import { render } from 'ink';
import { getEntries } from 'kame-core';
import * as React from 'react';

import { Command } from './commands/index';
import { Kame } from './components/Kame';
import {
  usePrimaryEntryViewStore,
  useSecondaryEntryViewStore
} from './stores/entry-view';
import { getEntryData } from './utilities/entry';

const L = usePrimaryEntryViewStore.getState();
const R = useSecondaryEntryViewStore.getState();

const dir = path.normalize(process.cwd());

getEntries(dir).then(async (entries) => {
  const promises = entries.map(async (entry) => {
    return await getEntryData(path.resolve(dir, entry));
  });

  const a = await Promise.all(promises);

  // TODO: add ..

  L.setEntries(a);
  R.setEntries(a);

  L.setFocused(true);
  L.setCursor(a.at(0)?.id || null);
  R.setCursor(a.at(0)?.id || null);
});

L.setPath(dir);
R.setPath(dir);

// NOTE: must write with JSX
render(
  <Command>
    <Kame cwd={process.cwd()} />
  </Command>
);

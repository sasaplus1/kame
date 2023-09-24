import * as path from 'node:path';
import { render } from 'ink';
import { getEntries } from 'kame-core';
import * as React from 'react';

import { Command } from './commands/index';
import { Kame } from './components/Kame';
import { useEntryViewStores } from './stores/entry-view';
import { getEntryData } from './utilities/entry';

const L = useEntryViewStores[0].getState();
const R = useEntryViewStores[1].getState();

const dir = path.normalize(process.cwd());

getEntries(dir).then(async (entries) => {
  const promises = await entries.map(async (entry) => {
    return await getEntryData(path.resolve(dir, entry));
  });

  const a = await Promise.all(promises);

  // TODO: add ..

  L.setEntries(a);
  R.setEntries(a);

  L.setFocus(true);
  L.setCursorEntry(a.at(0) || null);
});

L.setPath(dir);
R.setPath(dir);

// NOTE: must write with JSX
render(
  <Command>
    <Kame cwd={process.cwd()} />
  </Command>
);

import * as fs from 'node:fs';

/***/
export async function getEntries(directory: string): Promise<string[]> {
  return await fs.promises.readdir(directory);
}

/***/
export async function getStat(entry: string): Promise<fs.Stats> {
  return await fs.promises.stat(entry);
}

/***/
export async function getLStat(entry: string): Promise<fs.Stats> {
  return await fs.promises.lstat(entry);
}

/***/
export async function createDirectory(entry: string): Promise<void> {
  await fs.promises.mkdir(entry, { recursive: true });
}

/***/
export async function createFile(entry: string): Promise<void> {
  await fs.promises.writeFile(entry, '');
}

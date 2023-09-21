import * as fs from 'node:fs';

/***/
export function getModifiedTime(stat: fs.Stats): {
  fullYear: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
} {
  const { mtime } = stat;

  mtime.setTime(mtime.getTime() - mtime.getTimezoneOffset() * 60 * 1000);

  return {
    fullYear: mtime.getUTCFullYear(),
    month: mtime.getUTCMonth() + 1,
    date: mtime.getUTCDate(),
    hours: mtime.getUTCHours(),
    minutes: mtime.getUTCMinutes(),
    seconds: mtime.getUTCSeconds(),
    milliseconds: mtime.getUTCMilliseconds()
  };
}

export type FileType = 'd' | 'l' | '-' | '?';

/***/
export async function getFileType(entry: string): Promise<FileType> {
  const [stat, lstat] = await Promise.all([
    fs.promises.stat(entry),
    fs.promises.lstat(entry)
  ]);

  if (lstat.isSymbolicLink()) {
    return 'l';
  }

  switch (stat.mode & 0o770000) {
    // case 0o010000: // FIFO
    // case 0o020000: // Character device
    case 0o040000: // Directory
      return 'd';
    // case 0o060000: // Block device
    case 0o100000: // Regular file
      return '-';
    case 0o120000: // Symbolic link
      return 'l';
    // case 0o140000: // Socket
    default:
      return '?';
  }
}

/***/
export async function getPermission(stat: fs.Stats): Promise<string> {
  const mode = stat.mode & 0o700;

  const r = mode & 0o400 ? 'r' : '-';
  const w = mode & 0o200 ? 'w' : '-';
  const x = mode & 0o100 ? 'x' : '-';

  return r + w + x;
}

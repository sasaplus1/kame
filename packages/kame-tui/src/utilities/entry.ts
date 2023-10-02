import * as crypto from 'node:crypto';
import * as path from 'node:path';
import {
  getFileType,
  getModifiedTime,
  getPermission,
  getStat
} from 'kame-core';
import { formatDate, formatMode, formatFileSize } from '../utilities/format';

/***/
export async function getEntryData(entry: string) {
  const stat = await getStat(entry);

  const date = getModifiedTime(stat);

  const [filetype, permission] = await Promise.all([
    getFileType(entry),
    getPermission(entry)
  ]);

  const uuid = crypto.randomUUID();

  const result = {
    id: uuid,
    key: uuid,
    entry: path.basename(entry),
    date: formatDate(date),
    mode: formatMode(filetype, permission),
    size: formatFileSize(stat.size)
  };

  if (filetype === 'd') {
    Object.assign(result, { marker: '+' });
  }

  return result;
}

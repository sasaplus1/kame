import type { getModifiedTime } from 'kame-core';

import { filesize } from 'filesize';

/***/
export function formatEntry() {}

/***/
export function formatDate(date: ReturnType<typeof getModifiedTime>): string {
  const YYYY = String(date.fullYear).padStart(4, '0');
  const MM = String(date.month).padStart(2, '0');
  const DD = String(date.date).padStart(2, '0');
  const hh = String(date.hours).padStart(2, '0');
  const mm = String(date.minutes).padStart(2, '0');

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}`;
}

/***/
export function formatMode(filetype: string, permission: string): string {
  return filetype + permission;
}

/***/
export function formatFileSize(size: number): string {
  const { value, unit } = filesize(size, { output: 'object' });

  return `${String(value).padStart(6, ' ')} ${unit.padEnd(2, ' ')}`;
}

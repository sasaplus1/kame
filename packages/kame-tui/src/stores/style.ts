import type { TextProps } from 'ink';

// NOTE: avoid TS2742
type TextPropsWithoutLiteralUnion = Omit<
  TextProps,
  'backgroundColor' | 'color'
>;

export type TextStyle = Partial<
  {
    backgroundColor: string;
    color: string;
  } & Omit<TextPropsWithoutLiteralUnion, 'children' | 'wrap'>
>;

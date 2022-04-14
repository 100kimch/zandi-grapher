import type { Page } from '~models';

export interface Props extends Page.ComponentProps<'div'> {
  id?: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

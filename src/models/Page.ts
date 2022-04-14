import type { DefaultTheme, StyledComponentProps } from 'styled-components';

namespace Page {
  export type NavigationRequest =
    | {
        pathname: string;
        params?: Record<string, string>;
      }
    | string;

  export type ComponentProps<T extends string = 'div'> = StyledComponentProps<
    T,
    DefaultTheme,
    {},
    never
  >;

  export interface Detail {
    url: string;
  }
}

export default Page;

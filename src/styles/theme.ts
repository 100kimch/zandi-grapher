const theme = {
  mode: 'light',
  colors: {
    node: '#875394',
    edge: '#434232',
  },
  fonts: {},
  screens: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
  },
};

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme;

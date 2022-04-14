import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import './global.less';
import theme from './theme';

const GlobalStyles = createGlobalStyle<{ theme: typeof theme }>`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #eee;
  }

  ::-webkit-scrollbar{ width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background-color: transparent; }
  ::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.25); border-radius: 10px; opacity: 0.2; }
  ::-webkit-scrollbar-thumb:hover {background: transparent; }
  ::-webkit-scrollbar-button:start:decrement,::-webkit-scrollbar-button:end:increment { width: 8px; height: 8px; background: transparent; }

`;

export default GlobalStyles;

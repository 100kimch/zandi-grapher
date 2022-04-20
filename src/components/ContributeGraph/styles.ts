import styled from 'styled-components';

export const MainBlock = styled.div`
  width: 800px;
  height: 100vh;

  & > canvas {
    position: absolute;
    width: 100%;
    min-height: 30em;
  }

  @media (min-width: ${(props) => props.theme.screens.xl}) {
  }
`;

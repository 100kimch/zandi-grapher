import styled from 'styled-components';

export const MainBlock = styled.div`
  width: 100%;
  height: 100%;
  min-height: 15em;

  & > canvas {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (min-width: ${(props) => props.theme.screens.xl}) {
  }
`;

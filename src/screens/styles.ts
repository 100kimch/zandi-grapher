import styled from 'styled-components';
import { SPACING } from '~constants';

export const MainBlock = styled.div`
  padding: 2em 8em;

  #graph {
    white-space: nowrap;
    .row {
      display: inline-block;
      margin-right: calc(-100% + ${SPACING + 'px'});
    }
  }
`;
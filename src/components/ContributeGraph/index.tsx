import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { useDrawer } from '~hooks';

// import Grass from '../Grass';
import { MainBlock } from './styles';
import { Props } from './types';

export default ({ id, data, ...otherProps }: Props) => {
  const test = useTheme();
  const [boxRef, updateBoxDrawer] = useDrawer('box');
  const [grassRef, updateGrassDrawer] = useDrawer('grass');

  useEffect(() => {
    console.log('test theme: ', test);
    const chunks: number[][] = [];
    for (let i = 0; i < data.length; i += 7) {
      chunks.push(data.slice(i, i + 7));
    }
    updateBoxDrawer(chunks);
    updateGrassDrawer(chunks);
  }, []);

  return (
    <MainBlock id={id} {...otherProps}>
      <canvas
        id="box"
        ref={boxRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <canvas
        id="grasses"
        ref={grassRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </MainBlock>
  );
};

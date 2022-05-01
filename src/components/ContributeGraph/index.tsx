import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useDrawer } from '~hooks';

// import Grass from '../Grass';
import { MainBlock } from './styles';
import { Props } from './types';

export default ({ id, data, ...otherProps }: Props) => {
  const test = useTheme();
  const [legendRef, updateLegendDrawer] = useDrawer('legend');
  const [boxRef, updateBoxDrawer] = useDrawer('box');
  const [grassRef, updateGrassDrawer] = useDrawer('grass');

  useEffect(() => {
    console.log('test theme: ', test);
    const chunks: number[][] = [];
    for (let i = 0; i < data.length; i += 7) {
      chunks.push(data.slice(i, i + 7));
    }
    updateLegendDrawer(chunks);
    updateBoxDrawer(chunks);
    updateGrassDrawer(chunks);
  }, []);

  return (
    <MainBlock id={id} {...otherProps}>
      <canvas
        id="legends"
        ref={legendRef}
        style={{
          marginBottom: legendRef.current ? -legendRef.current.clientHeight : 0,
        }}
      />
      <canvas
        id="boxes"
        ref={boxRef}
        style={{
          marginBottom: boxRef.current ? -boxRef.current.clientHeight : 0,
        }}
      />
      <canvas id="grasses" ref={grassRef} />
    </MainBlock>
  );
};

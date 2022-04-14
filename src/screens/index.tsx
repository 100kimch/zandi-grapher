import React, { useEffect, useState } from 'react';
import { ContributeBox, Grass } from '~components';

import { MainBlock } from './styles';

export default () => {
  const dx = 30,
    dy = 30,
    raw_contributes = Array.from(Array(124).keys());

  const [contributeChunks, setContributeChunks] = useState<number[][]>([]);

  useEffect(() => {
    const ret = [];
    for (let i = 0; i < raw_contributes.length; i += 7) {
      ret.push(raw_contributes.slice(i, i + 7));
    }
    console.log('a: ', ret, raw_contributes);
    setContributeChunks(ret);
  }, []);

  return (
    <MainBlock>
      {/* <h1>진진자라 지리진자</h1> */}
      {/* <Grass /> */}
      <div id="graph">
        {contributeChunks.map((contributes, numRow) => (
          <div className="row" key={numRow}>
            {contributes.map((contribute, numCol) => (
              // <li key={contribute}>{contribute}</li>
              <ContributeBox
                key={numRow + '-' + numCol}
                x={numCol}
                y={numRow}
                dx={dx}
                dy={dy}
              />
            ))}
          </div>
        ))}
        {/* <ContributeBox dx={dx} dy={dy} /> */}
      </div>
    </MainBlock>
  );
};

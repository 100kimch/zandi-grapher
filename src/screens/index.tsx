import React, { useEffect, useState } from 'react';
import { ContributeBox, ContributeGraph, Grass } from '~components';

import { MainBlock } from './styles';

export default () => {
  const dx = 30,
    dy = 30,
    rawData = Array.from(Array(28).keys());

  const [contributeChunks, setContributeChunks] = useState<number[][]>([]);

  useEffect(() => {
    const ret = [];
    for (let i = 0; i < rawData.length; i += 7) {
      ret.push(rawData.slice(i, i + 7));
    }
    console.log('a: ', ret, rawData);
    setContributeChunks(ret);
  }, []);

  return (
    <MainBlock>
      <ContributeGraph id="sample1" data={rawData} />
      {/* <Grass /> */}
      {/* <div id="graph">
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
      </div> */}
    </MainBlock>
  );
};

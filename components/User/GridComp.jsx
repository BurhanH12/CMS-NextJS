import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import Container from './Container';

const Grid = ({ gap = 0, marginTop = 0, marginBottom = 0, marginLeft = 0, marginRight = 0, children, ...props }) => {
  const { connectors: { connect, drag }, actions: { add } } = useNode();
  const editor = useEditor();

  const handleAddContainer = (index) => {
    add(<Container />, index);
  };

  const parent = editor.query.node((node) => node.id === props.nodeId);

  const isSingleRow = parent?.data?.isSingleRow;
  const isDoubleRow = parent?.data?.isDoubleRow;
  const existingGrids = editor.query.node((node) => node.data.displayName === 'Grid' && node.id !== props.nodeId)?.getAll() ?? [];

  let totalGrids = existingGrids.length + 1;

  if (isDoubleRow) {
    totalGrids = existingGrids.filter((grid) => grid.data.width === '50%').length + 1;
  }

  if (isSingleRow) {
    totalGrids = existingGrids.filter((grid) => grid.data.width === '100%').length + 1;
  }

  const width = `${100 / totalGrids}%`;

  return (
    <div {...props} ref={ref => connect(drag(ref))} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: `${gap}px`, margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px` }}>
      {React.Children.toArray(children).map((child, index) => (
        <div key={index} style={{ width: `${width}`, marginBottom: `${gap}px` }}>
          {child}
        </div>
      ))}
      {totalGrids <= 4 && (
        <div style={{ width: `${width}`, marginBottom: `${gap}px` }}>
          <Container />
        </div>
      )}
      {isSingleRow && totalGrids === 2 && (
        <div style={{ width: `${width}`, marginBottom: `${gap}px` }}>
          <button onClick={() => {
            const [existingGrid] = existingGrids;
            existingGrid.update((node) => {
              node.data.width = '50%';
            });

            add(<Grid isDoubleRow />, 1);
          }}>Add Grid</button>
        </div>
      )}
      {isDoubleRow && totalGrids === 3 && (
        <div style={{ width: `${width}`, marginBottom: `${gap}px` }}>
          <button onClick={() => {
            existingGrids.forEach((grid) => {
              grid.update((node) => {
                node.data.width = '33.33%';
              });
            });

            add(<Grid isSingleRow />, 2);
          }}>Add Grid</button>
        </div>
      )}
    </div>
  );
};

export default Grid;

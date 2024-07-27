import React from 'react';

interface SnakeProps {
  snake: Array<[number, number]>;
}

const TILE_SIZE = 20;

const Snake: React.FC<SnakeProps> = ({ snake }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: TILE_SIZE,
            height: TILE_SIZE,
            backgroundColor: index === 0 ? 'lightgreen' : 'green',
            left: `${segment[0] * TILE_SIZE}px`,
            top: `${segment[1] * TILE_SIZE}px`,
          }}
        />
      ))}
    </>
  );
};

export default Snake;

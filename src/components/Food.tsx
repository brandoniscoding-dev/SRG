import React from 'react';

interface FoodProps {
  position: [number, number];
}

const TILE_SIZE = 20;

const Food: React.FC<FoodProps> = ({ position }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundColor: 'red',
        borderRadius: '50%',
        left: `${position[0] * TILE_SIZE}px`,
        top: `${position[1] * TILE_SIZE}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    />
  );
};

export default Food;

type Position = [number, number];

export const getRandomFoodPosition = (snake: Position[], gridSize: number): Position => {
  let newFoodPosition: Position;
  do {
    newFoodPosition = [
      Math.floor(Math.random() * gridSize),
      Math.floor(Math.random() * gridSize),
    ];
  } while (snake.some(segment => segment[0] === newFoodPosition[0] && segment[1] === newFoodPosition[1]));
  return newFoodPosition;
};

export const checkCollision = (head: [number, number], snake: Array<[number, number]>, gridSize: number): boolean => {
  // Collision avec les bords
  if (head[0] < 0 || head[0] >= gridSize || head[1] < 0 || head[1] >= gridSize) {
    return true;
  }

  // Collision avec le corps
  for (const segment of snake) {
    if (segment[0] === head[0] && segment[1] === head[1]) {
      return true;
    }
  }

  return false;
};


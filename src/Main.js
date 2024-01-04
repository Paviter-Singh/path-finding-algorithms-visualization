import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { createMap, addWeight } from "./util/createGrid";
import Queue from "./util/Queue";
import PriorityQueueLinear from "./util/priorityQueue";
import { shuffle2DArray } from "./util/shuffle";
import { DropDown } from "./components/DropDown";
import { sizeType, algorithmOptions, gridOptions } from "./types";
//Todo: select options from small medium and larget grid
//Todo: quesiton what to do when new state is selected, size
//Todo: Color Choices
let row = 17,
  col = 35,
  colorCount = 1;

//speed is below 10 don't stop
let speed = 0;
let pause = false;

const inRange = (arr, i, j) => {
  return !(i < 0 || i > row - 1 || j < 0 || j > col);
};
//challenges -- pause option
export default function Main() {
  //naming conventions
  const [arr, setArr] = useState([]);
  // const [speed, setSpeed] = useState(SPEED);
  const setSpeed = (value) => {
    speed = value;
  };
  //default size: large
  const [gridSize, setGridSize] = useState(sizeType[2]);
  const [isTarget, setIsTarget] = useState(false);
  const [target, setTarget] = useState({ x: 5, y: 14 });
  const [changeTarget, setChangeTarget] = useState(false);
  const [source, setSource] = useState({ x: 0, y: 0 });
  const [changeSource, setChangeSource] = useState(false);
  const [algorithm, setAlgorithm] = useState(algorithmOptions[0].value);
  const [gridOption, setGridOption] = useState(gridOptions[2].value);
  // const [pause, setPause] = useState(false);
  // const memoPause = useMemo(() => !pause, [pause]);
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    setArr(createMap(row, col, colorCount, false));
  }, []);
  const handleForceClick = () => {};
  // const setPause = (value)=>pause = value}
  const renderPrev = (arr, i = 0, j = 0) => {
    while (arr[i][j]?.prev) {
      arr[i][j].color = "blue";
      let obj = arr[i][j].prev;
      i = obj.i;
      j = obj.j;
    }
    // arr[i][j].color = "blue";
    return arr;
  };
  const handleDrap = (i, j, options = {}) => {
    let tempArr = arr;
    if (changeTarget || options.target) {
      setTarget({ x: i, y: j });
      return;
    } else if (changeSource || options.source) {
      setSource({ x: i, y: j });
      return;
    }
    if (arr[i][j].color === "") {
      tempArr[i][j].color = "black";
    } else if (arr[i][j].color === "black") {
      tempArr[i][j].color = "";
    }
    console.log("draging");
    setArr([...tempArr]);
  };
  const handleMouseDown = (x, y) => {
    setDragging(true);
    if (x === target.x && y === target.y) {
      handleDrap(x, y, { target: true });
      setChangeTarget(true);
    } else if (x === source.x && y === source.y) {
      setChangeSource(true, { source: true });
    } else {
      handleDrap(x, y);
    }
  };
  const handleMouseEnter = (x, y) => {
    if (dragging) {
      handleDrap(x, y);
    }
  };
  const handleMouseUp = () => {
    setDragging(false);
    if (changeTarget) {
      // renderPrev
      setArr([...renderPrev(arr, target.x, target.y)]);
      setChangeTarget(false);
    }
    setChangeSource(false);
  };
  const handleGridSize = (event) => {
    let value = event.target.value;
    console.log(value);
    setGridSize(value);
  };
  const handleClick = (i, j) => {};
  const softReset = () => {
    const skipColor = new Set(["black"]);
    let newArr = arr.map((row) => {
      return row.map((cell) => {
        if (skipColor.has(cell.color))
          return { ...cell, prev: null, value: null };
        return { ...cell, color: "", prev: null, value: null };
      });
    });
    setArr(newArr);
    return newArr;
  };
  const createMaze = () => {
    //  let maze =createMap( row, col, colorCount, false)
    let maze = softReset();
    generateMaze(maze, 1, 1);
    console.log(maze);
    setArr(maze);
    return maze;
  };
  const handleReset = (event) => {
    //should have two option one for hard and soft reset
    //createMaze option
    // setArr(createMap(row, col))
    let value = event.target.value;
    setGridOption(value);
    if (value === gridOptions[0].value) {
      //remove every thing make is blank
      setArr(createMap(row, col));
    } else if (value === gridOptions[1].value) {
      //remove the blue color only
      softReset();
    } else if (value === gridOptions[2].value) {
      //create Maze
      createMaze();
    }
  };
  const handlePause = () => {
    pause = !pause;
    handleForceClick();
  };
  const handleChangeTarget = () => {
    setIsTarget(true);
  };
  const handleAlgoChange = (event) => {
    let value = event.target.value;
    setAlgorithm(value);
  };
  const runAlgo = (event) => {
    // Todo: could select same value

    //should I soft reset the grid before running
    //need to have drop down, para - target, source
    const value = algorithm;
    if (value === algorithmOptions[0].value) {
      //BFS
      runBFS(softReset(), source.x, source.y, setArr);
    } else if (value === algorithmOptions[1].value) {
      //DFS weird also, don't use to find shortest path,
      //delete the target
      runDFS(softReset(), source.x, source.y, setArr);
    } else if (value === algorithmOptions[2].value) {
      // Dijkstra Todo: to have old and new value, text get select
      runDijkstra(addWeight([...arr]), source.x, source.y);
    } else if (value === algorithmOptions[3].value) {
      //flood fill
      const { x, y } = source;
      let newArr = createMap(row, col, 2);
      floodFill(newArr, x, y, newArr[x][y].color, "black", null);
    }
  };
  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value, 10);
    setSpeed(newSpeed);
  };
  const runDijkstra = async (arr, startI, startJ) => {
    const priorityQueue = new PriorityQueueLinear((node) => node.value);
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    const isInRange = (x, y) =>
      x >= 0 && x < arr.length && y >= 0 && y < arr[0].length;

    const exploreNeighbors = async (currentNode) => {
      for (const [dx, dy] of directions) {
        const x = currentNode.x + dx;
        const y = currentNode.y + dy;

        if (isInRange(x, y) && arr[x][y].color === "") {
          arr[x][y].value += currentNode.value;
          arr[x][y].color = "green";
          arr[x][y].prev = { i: currentNode.x, j: currentNode.y };

          priorityQueue.push(arr[x][y]);
          setArr([...arr]);

          // Simulate delay using await
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }
      currentNode.color = "green";
    };

    arr[startI][startJ].color = "green";
    priorityQueue.push(arr[startI][startJ]);
    while (!priorityQueue.isEmpty()) {
      const minNode = priorityQueue.pop();
      minNode.color = "blue";

      if (minNode.x === target.x && minNode.y === target.y) {
        // If the target is reached, render the path and break the loop
        renderPrev(arr, minNode.x, minNode.y);
        setArr([...arr]);
        break;
      }
      // Explore neighbors asynchronously
      await exploreNeighbors(minNode);
    }

    return arr;
  };
  const floodFill = (arr, i, j, curr, color, prev) => {
    // if(pause)return  {arr, color:curr};
    if (i < 0 || i > row - 1 || j < 0 || j > col || arr[i][j].color !== curr)
      return { arr, color };
    if (curr === color) {
      arr[i][j].prev = prev;
      return { arr, color: curr };
    }
    arr[i][j].prev = prev;
    // if (target.x === i && target.y === j) {
    //   renderPrev(arr, i, j);
    //   return { arr, color: "green" };
    // }
    arr[i][j].color = color;
    setTimeout(() => {
      floodFill(arr, i + 1, j, curr, color, { x: i, y: j });
      floodFill(arr, i - 1, j, curr, color, { x: i, y: j });
      floodFill(arr, i, j + 1, curr, color, { x: i, y: j });
      floodFill(arr, i, j - 1, curr, color, { x: i, y: j });
      setArr([...arr]);
    }, speed);
    return { arr, color };
  };
  const generateMaze = (maze, x, y) => {
    const isValid = (x, y, rows, cols) => {
      return x >= 1 && x < rows - 1 && y >= 1 && y < cols - 1;
    };
    const shuffle = (array) => {
      // Fisher-Yates shuffle algorithm
      const shuffledArray = array.slice();
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    };
    maze[x][y].color = "black"; // Mark the current cell as open

    const directions = shuffle([
      { dx: 2, dy: 0 },
      { dx: 0, dy: 2 },
      { dx: -2, dy: 0 },
      { dx: 0, dy: -2 },
    ]);

    for (const dir of directions) {
      const newX = x + dir.dx;
      const newY = y + dir.dy;

      if (isValid(newX, newY, row, col) && maze[newX][newY].color === "") {
        maze[x + dir.dx / 2][y + dir.dy / 2].color = "black"; // Carve a path
        generateMaze(maze, newX, newY); // Recursively visit the next cell
      }
    }
  };
  const runBFS = async (arr, startI, startJ) => {
    const qu = new Queue();
    const dxy = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    arr[startI][startJ].color = "green";
    qu.push(arr[startI][startJ]);

    const exploreNeighbors = async (minNode) => {
      minNode.color = "blue";

      for (let k = 0; k < 4; k++) {
        const x = minNode.x + dxy[k][0];
        const y = minNode.y + dxy[k][1];
        while (pause) {
          console.log(pause);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        if (inRange(arr, x, y) && arr[x][y].color === "") {
          arr[x][y].color = "green";
          arr[x][y].prev = { i: minNode.x, j: minNode.y };
          qu.push(arr[x][y]);
          if (speed > 5) {
            setArr([...arr]);
            if (speed > 5)
              await new Promise((resolve) => setTimeout(resolve, speed));
          }
        }
      }
      minNode.color = "green";
    };

    while (!qu.isEmpty()) {
      const minNode = qu.pop();
      if (minNode.x === target.x && minNode.y === target.y) {
        renderPrev(arr, minNode.x, minNode.y);
        setArr([...arr]);
        return arr;
      }
      await exploreNeighbors(minNode);
    }
    return arr;
  };
  const runDFS = async (arr, startI, startJ) => {
    let stack = [];
    let dxy = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    stack.push({ i: startI, j: startJ });
    let prev = null;
    while (stack.length > 0) {
      let { i, j } = stack.pop();
      while (pause) {
        console.log(pause);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (inRange(arr, i, j) && arr[i][j].color === "") {
        arr[i][j].color = "green";
        arr[i][j].prev = prev;
        prev = { i, j };
        // Check if the current cell is the target
        if (arr[i][j].x === target.x && arr[i][j].y === target.y) {
          // renderPrev(arr, arr[i][j].x, arr[i][j].y);
          // setArr([...arr]);
          return arr;
        }
        dxy = shuffle2DArray(dxy);
        for (let k = 0; k < 4; k++) {
          stack.push({ i: i + dxy[k][0], j: j + dxy[k][1] });
        }
        await new Promise((resolve) => setTimeout(resolve, speed));
        setArr([...arr]);
      }
    }
    return arr;
  };
  return (
    <>
      <div>
        <div className="inline-flex">
          {/* <button
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            start/Reset
          </button> */}
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={runAlgo}
          >
            Run
          </button>
          <DropDown
            label={"reset options"}
            value={gridOption}
            options={gridOptions}
            onChange={handleReset}
          />
          <DropDown
            label={"resize the grid"}
            value={gridSize}
            options={sizeType.map((item) => {
              return { value: item, label: item };
            })}
            onChange={handleGridSize}
          />
          <DropDown
            label={"select value"}
            options={algorithmOptions}
            value={algorithm}
            onChange={handleAlgoChange}
          />
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={handleChangeTarget}
          >
            {isTarget ? "select the target" : "No target selected "}
          </button>
          <button
            onClick={handlePause}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            {pause ? "resume" : "pause"}
          </button>
        </div>
        <input
          onChange={handleSpeedChange}
          type="number"
          max="1000"
          min="0"
          value={speed}
        />
      </div>
      <div
        style={{
          display: "flex",
          marginLeft: "5px",
          width: "1080px",
          flexWrap: "wrap",
        }}
      >
        {arr.map((item) => {
          return item.map(({ key, x, y, color, callBack, value, ...rest }) => {
            // console.log({x,y}, source)
            return (
              <Cell
                key={key}
                x={x}
                y={y}
                color={color}
                onClick={() => handleClick(x, y)}
                onMouseDown={() => handleMouseDown(x, y)}
                onMouseEnter={() => handleMouseEnter(x, y)}
                onMouseUp={handleMouseUp}
                value={value}
                size={gridSize}
                {...rest}
                isSource={x === source.x && y === source.y}
                isTarget={x === target.x && y === target.y}
              />
            );
          });
        })}
      </div>
    </>
  );
}
//Todo: dropdown UI, flood fill, run on same select, grid size

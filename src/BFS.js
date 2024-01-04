import React, { useState, useMemo } from 'react';
import Cell from './Cell'
import { createMap } from './util/createGrid'
import Queue from './util/Queue';
import { paste } from '@testing-library/user-event/dist/paste';

const row = 17, col = 35, colorCount = 1
// let SPEED = 500;
let speed = 100;
let pause = false;
const Arr = createMap( row, col, colorCount,false)

export default function BFS() {
    const [arr, setArr] = useState([...Arr])
    // const [speed, setSpeed] = useState(SPEED);
    const setSpeed = (value)=>{ speed = value;}
    const [isTarget, setIsTarget] = useState(false);
    const [target, setTarget] = useState({x:-1,y:-1});
    // const [pause, setPause] = useState(false);
    // const memoPause = useMemo(() => !pause, [pause]);
    const [forceUpdate, setForceUpdate] = useState(false);

  const handleForceClick = () => {
    setForceUpdate(!forceUpdate); // Toggling a state variable can force a re-render.
  };
    // const setPause = (value)=>pause = value}
    const renderPrev = (arr, i, j) => {
        console.log('render rpev is called ')
        while (arr[i][j]?.prev) {
            arr[i][j].color = 'blue';
            let obj = arr[i][j].prev;
            i = obj.x;
            j = obj.y;
        }
        arr[i][j].color = 'blue';
    }
    const generateMaze = (maze, x, y) => {

        const isValid = (x, y, rows, cols) => {
            return x >= 1 && x < rows - 1 && y >= 1 && y < cols - 1;
          };
          const shuffle = (array) => {
            // Fisher-Yates shuffle algorithm
            const shuffledArray = array.slice();
            for (let i = shuffledArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            return shuffledArray;
          };
        maze[x][y].color = 'black'; // Mark the current cell as open
    
        const directions = shuffle([
          { dx: 2, dy: 0 },
          { dx: 0, dy: 2 },
          { dx: -2, dy: 0 },
          { dx: 0, dy: -2 },
        ]);
    
        for (const dir of directions) {
          const newX = x + dir.dx;
          const newY = y + dir.dy;
    
          if (isValid(newX, newY, row, col) && maze[newX][newY].color==='') {
            maze[x + dir.dx / 2][y + dir.dy / 2].color = 'black'; // Carve a path
            generateMaze(maze, newX, newY); // Recursively visit the next cell
          }
        }
      };
    

    const handleClick = (i, j) => {
        let maze = [...arr];
        // runDijkstra(arr, i, j)
        generateMaze(maze, 1,1);
        console.log(maze)
        setArr([...maze])
    }
    const handleReset = () => {
        console.log('handleReset is called')
        setArr(createMap(row, col))
    }
    const handlePause = () => {
       
        pause = !pause
        handleForceClick()
    }
    const handleMouseOver = (i, j) => {
       
    }
    const handleChangeTarget = ()=>{
        setIsTarget(true)
    }
    const handleRunFloodFill = () => {
        console.log('handle Flood file called')
    }
    const handleSpeedChange = (e) => {
        const newSpeed = parseInt(e.target.value, 10);
        setSpeed(newSpeed);
        console.log(newSpeed); // Log the updated speed value
      }
    return (<><div>
        <div className="inline-flex">
  <button onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
  Reset
  </button>
  <button onClick={handleRunFloodFill} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
  Run Flood file
  </button>
<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={handleChangeTarget}>{isTarget?"select the target":'No target selected '}</button>
        <button onClick={handlePause} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">{pause?'resume':'pause'}</button>
</div>
      
        <input
      onChange={handleSpeedChange}
      
      type='number'
      max="1000"
      min="0"
      value={speed} 
    />
    </div>
        <div style={{ display: "flex", marginLeft: "5px", width: '1080px', flexWrap: "wrap" }}>{
            arr.map((item) => {
                    return item.map(({ key, x, y, color, callBack }) => {
                        return <Cell key={key} x={x} y={y} color={color}  onMouseOverCallback={handleMouseOver} onClick={handleClick} />
                                    }
                        )
                    }
            )
        }
        </div>
    </>)
}

// const runDijkstra = (arr, i, j) => {
    //     // if(pause)return  {arr, color:curr};
    //     // if (i < 0 || i > row - 1 || j < 0 || j > col || arr[i][j].color !== curr) return { arr, color };
    //     const qu = new Queue();
    //     let dxy = [[-1,0],[1,0],[0,-1],[0,1]];
    //     // let dy = [-1, 1];
    //     arr[i][j].color = "green";
    //     qu.push(arr[i][j]);
    //     let k = 0;
    //     const myloop = (minNode)=>{
    //         // console.log(minNode)
    //         minNode.color = "blue"
    //         setTimeout(()=>{
    //             // console.log(minNode, " k :", k)
    //             if(minNode.x===target.x && minNode.y===target.y){
    //                 renderPrev(arr, minNode.x, minNode.y)
    //             }
    //             let x = minNode.x+dxy[k][0];
    //                 let y = minNode.y+dxy[k][1];
    //                 if(inRange(arr, x , y) && arr[x][y].color==""){
    //                     // arr[x][y].value += minNode.value;
    //                     arr[x][y].color = "green";
    //                     arr[x][y].prev = minNode;
    //                     qu.push(arr[x][y])   
    
    //                 }
    //                 setArr([...arr])
    //             k++;
    //             if(k<4){
    //                 myloop(minNode)
    //             }
    //             else{
    //                 if(!qu.isEmpty()){
                        
    //                     k = 0;
    //                     minNode.color = "green"
    //                     myloop(qu.pop())
    //                 }
    //             }
    //         }, speed)
        
    //     }
    //     while(!qu.isEmpty()){
    //         let minNode = qu.pop();
    //         // console.log(minNode)
    //         k = 0;
    //         myloop(minNode)
    //     }
     //     return arr;

    // }
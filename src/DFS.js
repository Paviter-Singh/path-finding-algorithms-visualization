import React, { useState, useEffect } from 'react';
import Cell from './Cell'
import { createMap } from './util/createGrid'
import { shuffle2DArray } from './util/shuffle'

const row = 17, col = 32, colorCount = 1, speed = 50;
// const Arr = createMap( row, col, colorCount,false)

export default function DfsComponent() {
    const [arr, setArr] = useState([])
    const [isTarget, setIsTarget] = useState(false);
    const [target, setTarget] = useState({x:-1,y:-1});
    const [pause, setPause] = useState(false);
    useEffect(()=>{
        setArr(createMap( row, col, colorCount, true))
    },[])
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
    const inRange = (arr, i, j )=>{
        return !(i < 0 || i > row - 1 || j < 0 || j > col)
    }
    // const DFS = (arr, i, j) => {
    //     // if(pause)return  {arr, color:curr};
    //     // if (i < 0 || i > row - 1 || j < 0 || j > col || arr[i][j].color !== curr) return { arr, color };
    //     if(!(inRange(arr, i , j) && arr[i][j].color==""))return;
    //     let dxy = [[-1,0],[1,0],[0,-1],[0,1]];
    //     // let dy = [-1, 1];
    //     arr[i][j].color = "green";
    //     let minNode = arr[i][j]
    //     if(minNode.x===target.x && minNode.y===target.y){
    //         renderPrev(arr, minNode.x, minNode.y)
    //     }
    //     setTimeout(()=>{

    //         for(let k=0;k<4;k++){
    //             runDijkstra(arr, minNode.x+dxy[k][0], minNode.y+dxy[k][1])
    //         }
    //         setArr([...arr])
    //     },speed)
      
        
    //     return arr;

    // }
    const DFS = async (arr, startI, startJ) => {
        let stack = [];
        let dxy = [[-1,0],[1,0],[0,-1],[0,1]];
        stack.push({ i: startI, j: startJ });
        while (stack.length > 0) {
          let { i, j } = stack.pop();
          if (inRange(arr, i, j) && arr[i][j].color === "") {
            arr[i][j].color = "green";
            // Check if the current cell is the target
            if (arr[i][j].x === target.x && arr[i][j].y === target.y) {
              renderPrev(arr, arr[i][j].x, arr[i][j].y);
              setArr([...arr]);
              return arr;
            }
            dxy = shuffle2DArray(dxy)
            for (let k = 0; k < 4; k++) {
              stack.push({ i: i + dxy[k][0], j: j + dxy[k][1] });
            }
            await new Promise((resolve) => setTimeout(resolve, speed)); 
            setArr([...arr]);
          }
        }      
        return arr;
      };
      
    const handleClick = (i, j) => {
        if(isTarget){
            setTarget({x:i,y:j})
            setIsTarget(false)
            if(arr[i][j].color==='green'){
                renderPrev(arr, i, j)
            }
            return;
        }
        console.log('handleClick is called ', i, j)
        DFS(arr, i, j)
    }
    const handleReset = () => {
        setArr(createMap(row, col))
    }
    const handlePause = () => {
        console.log(pause)
        setPause((state) => !state)
    }
    const handleMouseOver = (i, j) => {
        if (pause) {
            arr[i][j].color = "yellow";
            setArr([...arr])
            return;
        }
    }
    const handleChangeTarget = ()=>{
        setIsTarget(true)
    }
    const handleRunFloodFill = () => {
        console.log('handle Flood file called')
    }
    return (<><div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleRunFloodFill}>Run Flood file</button>
        <button onClick={handleChangeTarget}>{isTarget?"select the target":'No target selected '}</button>
    </div>
        <div style={{ display: "flex", marginLeft: "5px", width: '1080px', flexWrap: "wrap" }}>{
            arr.map((item) => {
                    return item.map(({ key, x, y, color, callBack }) => {
                        return <Cell key={key} x={x} y={y} color={color}  onMouseOverCallback={handleMouseOver} onClickCallback={handleClick} />
                                    }
                        )
                    }
            )
        }
        </div>
    </>)
}


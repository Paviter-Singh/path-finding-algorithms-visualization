import React, { useEffect, useState } from 'react';
import Cell from './Cell'
import { createMap } from './util/createGrid'
import PriorityQueueLinear from './util/priorityQueue';
// import './style/GGrid.css'
const row = 17, col = 32, colorCount = 1, speed = 100;
// const Arr = 

export default function Dijsktra() {
    
    // console.log('Dijskra is called ')
    const [arr, setArr] = useState([])
    const [isTarget, setIsTarget] = useState(false);
    const [target, setTarget] = useState({x:-1,y:-1});
    const [pause, setPause] = useState(false);
    // I intial provided the arr in intial state and is was called every time
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
    // const runDijkstra = (arr, i, j) => {
    //     // if(pause)return  {arr, color:curr};
    //     // if (i < 0 || i > row - 1 || j < 0 || j > col || arr[i][j].color !== curr) return { arr, color };
    //     const qu = new PriorityQueueLinear((a)=>a.value);
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
    //                     arr[x][y].value += minNode.value;
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
    //         // minNode.color = "green"
    //     }
    //     while(!qu.isEmpty()){
    //         let minNode = qu.pop();
    //         console.log(minNode)
    //         k = 0;
    //         myloop(minNode)
    //     }
    //     return arr;

    // }
    const runDijkstra = async (arr, startNode, targetNode) => {
        const priorityQueue = new PriorityQueueLinear((node) => node.value);
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      
        const isInRange = (x, y) => x >= 0 && x < arr.length && y >= 0 && y < arr[0].length;
      
        const exploreNeighbors = async (currentNode) => {
          for (const [dx, dy] of directions) {
            const x = currentNode.x + dx;
            const y = currentNode.y + dy;
      
            if (isInRange(x, y) && arr[x][y].color === "") {
              arr[x][y].value += currentNode.value;
              arr[x][y].color = "green";
              arr[x][y].prev = currentNode;
      
              priorityQueue.push(arr[x][y]);
              setArr([...arr]);
      
              // Simulate delay using await
              await new Promise((resolve) => setTimeout(resolve, speed));
            }
          }
          currentNode.color = "green";
        };
      
        startNode.color = "green";
        priorityQueue.push(startNode);
      
        while (!priorityQueue.isEmpty()) {
          const minNode = priorityQueue.pop();
          minNode.color = "blue";
      
          if (minNode.x === targetNode.x && minNode.y === targetNode.y) {
            // If the target is reached, render the path and break the loop
            renderPrev(arr, minNode.x, minNode.y);
            break;
          }
          // Explore neighbors asynchronously
          await exploreNeighbors(minNode);
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
        runDijkstra(arr, arr[i][j], target)
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
        <button onClick={handleChangeTarget}>Change target</button>
    </div>
        <div style={{ display: "flex", marginLeft: "5px", width: '1080px', flexWrap: "wrap" }}>{
            arr.map((item) => {
                    return item.map(({ key, x, y, color, callBack, value }) => {
                        return <Cell key={key} x={x} y={y} color={color} value={value} onMouseOverCallback={handleMouseOver} onClickCallback={handleClick} />
                  }
                        )
                    }
            )
        }
        </div>
    </>)
}





// let V =5; 
// // let V is vertex
// function dijkstraPure(graph, src){
//     let dist = new Array(V);
//     let sptSet = new Array(V);
//     //all dist as infinite and spt false
//     for(let i=0;i<V;i++){
//         dist[i] = Number.MAX_VALUE;
//         sptSet[i] = false;
//     }

//     // distance of src is always zero
//     dist[src] = 0;

//  //Find shortest path for all vertices
//     for(let count=0;count<V-1;count++){
//         //pick the minimun of vertices not yet proccess.
//         //u is always equal to src in first iteration

//         let u = minDistance(dist, sptSet);
//         sptSet[u] = true;

//         for(let v = 0; v< V; v++){
//             //update dist[v] only if is not in sptSet
//             //there is an edge from u to v. and total weight of 
//             //path from src to v thourgh u is smaller than current value of dist[v]

//             if(!sptSet[v] && graph[u][v] != 0 && dist[u] != Number.MAX_VALUE 
//             && dist[u] + graph[u][v] < dist[v]){
//                 dist[v] = dist[u] + graph[u][v];
//             }
//         }
//     }
// }

// function minDistance(dist, sptSet){
//     let min = Number.MAX_VALUE;
//     let min_index = -1;
//     for(let v = 0; v<V; v++){
//         if(sptSet[v] == false && dist[v] <= min){
//             min = dist[v];
//             min_index = v;
//         }
//     }
//     return min_index
// }

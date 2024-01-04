import React, { useState } from 'react';
import Cell from './Cell'
import { createMap } from './util/createGrid'
import { sizeType } from './types';
// import './style/GGrid.css'
const row = 17, col = 32, colorCount = 1, speed = 200;

export default function Grid() {
    const [arr, setArr] = useState(createMap(row, col, colorCount))
    const [pause, setPause] = useState(false);
    const renderPrev = (arr, i, j) => {
        while (arr[i][j]?.prev) {
            arr[i][j].color = 'green';
            let obj = arr[i][j].prev;
            i = obj.x;
            j = obj.y;
        }
        arr[i][j].color = 'green';
    }
    const floodFill = (arr, i, j, curr, color, target, prev) => {
        // if(pause)return  {arr, color:curr};
        if (i < 0 || i > row - 1 || j < 0 || j > col || arr[i][j].color !== curr) return { arr, color };
        if (curr === color) {
            arr[i][j].prev = prev;
            return { arr, color: curr };
        }
        arr[i][j].prev = prev;
        if (target.x === i && target.y === j) {
            renderPrev(arr, i, j)
            return { arr, color: 'green' };
        }
        arr[i][j].color = color;
        setTimeout(() => {
            floodFill(arr, i + 1, j, curr, color, target, { x: i, y: j })
            floodFill(arr, i - 1, j, curr, color, target, { x: i, y: j })
            floodFill(arr, i, j + 1, curr, color, target, { x: i, y: j })
            floodFill(arr, i, j - 1, curr, color, target, { x: i, y: j })
            setArr([...arr]);
        }, speed);
        return { arr, color };

    }
    const handleClick = (i, j) => {
        console.log('handleClick is called ', i, j)
        setArr([...floodFill(arr, i, j, arr[i][j].color, '#398fe6', { x: 9, y: 22 }, null).arr])
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
    const handleRunFloodFill = () => {
        console.log('handle Flood file called')
    }
    return (<><div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleRunFloodFill}>Run Flood file</button>
        <button onClick={handlePause}>{pause?'resume':'pause'}</button>
    </div>
        <div style={{ display: "flex", marginLeft: "5px", width: '1080px', flexWrap: "wrap" }}>{
            arr.map((item) => {
                    return item.map(({ key, x, y, color, callBack }) => {
                        return <Cell key={key} x={x} y={y} color={color} onMouseOverCallback={handleMouseOver} onClickCallback={handleClick} />
                                    }
                        )
                    }
            )
        }
        </div>
    </>)
}

function createMap(row, col, colorCount = 1, addWeight = false) {
  const map = [];
  console.log("createMap is called ");
  const color = ["", "green", "grey", "green", "yellow", ""];
  for (let i = 0; i < row; i++) {
    let row = [];
    for (let j = 0; j <= col; j++) {
      row.push({
        key: `${i}${j}`,
        prev: null,
        x: i,
        y: j,
        isSource: false,
        isTarget: false,
       
        color: color[Math.floor(Math.random() * colorCount)],
        callBack: function (x, y) {
          console.log("cell with value ", x, " ", y, " is called ");
        },
      });
    }
    map.push(row);
  }
  return map;
}
const addWeight = (arr)=>{
  const skipColor = new Set(["black"]);
  let newArr = arr.map((row) => {
    return row.map((cell) => {
      if (skipColor.has(cell.color)) return { ...cell, prev: null };
      return { ...cell, color: "", prev: null, value: Math.floor(Math.random() * 10)};
    });
  });
  return newArr
}
export { createMap, addWeight };

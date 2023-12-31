function createMap(row, col, colorCount, addValue = false) {
  const map = [];
  console.log("createMap is called ", addValue);
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
        value: addValue ? Math.floor(Math.random() * 10) : null,
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

export { createMap };

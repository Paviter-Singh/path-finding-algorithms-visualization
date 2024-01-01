import sourceImg from "./style/images/triangletwo-right.svg";
import targetImg from "./style/images/spaceshiptwo-right.svg";
import { sizeType } from "./types";
export default function Cell({
  value,
  color,
  isSource,
  isTarget,
  size = "large",
  style = {},
  ...rest
}) {
  //default size is large
  let sizeStyle = { width: "30px", height: "30px" };
  let backgroundStyle = {};
  if (size === sizeType[0]) {
    //small
    sizeStyle = { width: "10px", height: "10px" };
  } else if (size === sizeType[1]) {
    //medium
    sizeStyle = { width: "20px", height: "20px" };
  }
  if (isSource) {
    backgroundStyle["backgroundImage"] = `url(${sourceImg})`;
  } else if (isTarget) {
    backgroundStyle["backgroundImage"] = `url(${targetImg})`;
  }
  return (
    <div
      className="cell"
      style={{ backgroundColor: color, ...backgroundStyle, ...sizeStyle }}
      {...rest}
    >
      {value !== undefined ? value : ""}
    </div>
  );
}

import sourceImg from "./style/images/triangletwo-right.svg";
import targetImg from "./style/images/spaceshiptwo-right.svg";

export default function Cell({ value, color, isSource, isTarget, ...rest }) {
      if (isSource) {
    return (
      <div
        className="cell"
        style={{ backgroundColor: color, backgroundImage: `url(${sourceImg})` }}
        {...rest}
      >
        {value !== undefined ? value : ""}
      </div>
    );
  }
  if (isTarget) {
    return (
      <div
        className="cell"
        style={{ backgroundColor: color, backgroundImage: `url(${targetImg})` }}
        {...rest}
      >
        {value !== undefined ? value : ""}
      </div>
    );
  }
  return (
    <div className="cell" style={{ backgroundColor: color }} {...rest}>
      {value !== undefined ? value : ""}
    </div>
  );
}

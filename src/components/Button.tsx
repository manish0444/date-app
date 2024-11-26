import React from "react";
import "./Button.css";
function Button({
  text,
  handleClick,
  x,
  y,
}: {
  text: string;
  handleClick: () => void;
  x: number;
  y: number;
}) {
  const style =
    x === -1
      ? {}
      : ({
          position: "absolute",
          top: `${y}px`,
          left: `${x}px`,
        } as React.CSSProperties);
  return (
    <div>
      <button type="button" onClick={handleClick} style={style}>
        {text}
      </button>
    </div>
  );
}

export default Button;

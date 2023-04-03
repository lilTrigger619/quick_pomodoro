const { $AnimationCanvas } = require("./exports");

/*
window.addEventListener("resize", ({target})=>{
  $AnimationCanvas.width = target.innerWidth;
  $AnimationCanvas.height = target.innerHeight;
});
*/

const ctx = $AnimationCanvas.getContext("2d");

const circleProps = {
  posX: $AnimationCanvas.width / 2,
  posY: $AnimationCanvas.height / 2,
  size: $AnimationCanvas.width * .39,
};

const redraw = ({ percent, color }) => {
  const Percentage = parseFloat(percent) ?? 1;
  console.log({Percentage})
  const strokeColor = color ?? "black";
  ctx.clearRect(0, 0, $AnimationCanvas.width, $AnimationCanvas.height);
  ctx.beginPath();
  ctx.arc(
    circleProps.posX,
    circleProps.posY,
    circleProps.size,
    0,
    (2 * Math.PI) * Percentage
  );
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
};

const reset = () =>{
  const Percentage = 1
  const strokeColor = "black";
  ctx.clearRect(0, 0, $AnimationCanvas.width, $AnimationCanvas.height);
  ctx.beginPath();
  ctx.arc(
    circleProps.posX,
    circleProps.posY,
    circleProps.size,
    0,
    (2 * Math.PI) * Percentage
  );
  ctx.lineWidth = 10;
  ctx.strokeStyle = strokeColor;
  console.dir({ctx});
  ctx.stroke();

};

export const DrawAnimator = {
  redraw,
  reset,
  // reset: ()=>,
};

DrawAnimator.reset();

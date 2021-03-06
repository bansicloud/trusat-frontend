export default function sketch(p) {
  // can be changed by passed in props
  let noradNumber = 12345;
  let canvasSize = 48;

  // Colors for adge
  const pallette = [
    "#FC7756", // salmon
    "#db3f33", // mars
    "#004F85", // blue
    "#090914", // dark blue
    "white"
  ];

  // Configure processing drawing
  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize, p.SVG);
    // p.noLoop();
    p.rectMode(p.CENTER);
    p.strokeJoin(p.ROUND);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.noradNumber !== null) {
      noradNumber = props.noradNumber;
    }
  };

  p.draw = () => {
    let color1;
    let color2;

    // Color first hexagon (based on Sat's age using Sat ID number range)
    if (noradNumber < 20000) {
      color1 = pallette[0];
    } else if (noradNumber < 40000) {
      color1 = pallette[1];
    } else {
      color1 = pallette[2];
    }

    // Draw first hexagon
    p.stroke(color1);
    drawHexagon1();

    // Color second hexagon (based on Sat's age using Sat ID number range)
    if (noradNumber < 20000) {
      color2 = pallette[2];
    } else if (noradNumber < 40000) {
      color2 = pallette[0];
    } else {
      color2 = pallette[1];
    }

    // Draw second hexagon
    p.fill(color2);
    p.stroke(color2);
    drawHexagon2();

    // Draw highlight
    drawHighlight();

    // Draw lowlight
    drawLowlight();
    p.blendMode(p.BLEND);

    // Draw number text
    p.noStroke();
    p.textAlign(p.CENTER);
    p.textSize(10);
    p.fill(pallette[4]);
    p.text(noradNumber, canvasSize / 2, canvasSize / 2 + 3);
  };

  // Polygon drawers
  function drawHexagon1() {
    p.noFill();
    p.beginShape();
    p.vertex(24, 0.953);
    p.vertex(43.919, 12.453);
    p.vertex(43.919, 35.453);
    p.vertex(24, 46.953);
    p.vertex(4.081, 35.453);
    p.vertex(4.081, 12.453);
    p.endShape(p.CLOSE);
  }

  function drawHexagon2() {
    p.beginShape();
    p.vertex(24, 4.953);
    p.vertex(40.454, 14.453);
    p.vertex(40.454, 33.453);
    p.vertex(24, 42.953);
    p.vertex(7.546, 33.453);
    p.vertex(7.546, 14.453);
    p.endShape(p.CLOSE);
  }

  function drawHighlight(color) {
    p.blendMode(p.SCREEN);
    p.noFill();
    p.stroke(255, 255, 255, 75);
    p.beginShape();
    p.vertex(7.546, 14.453);
    p.vertex(24, 4.953);
    p.vertex(40.454, 14.453);
    p.endShape();
  }

  function drawLowlight(color) {
    p.blendMode(p.MULTIPLY);
    p.noFill();
    p.stroke(8, 17, 34, 100);
    p.beginShape();
    p.vertex(40.454, 33.453);
    p.vertex(24, 42.953);
    p.vertex(7.546, 33.453);
    p.endShape();
  }
}

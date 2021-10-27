import React from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  LineSeries,
  ChartLabel
} from "react-vis";
import 'react-vis/dist/style.css';

/*
 * Props:
 * === required ===
 * rightTitle: title of x+
 * leftTitle: title of x-
 * topTitle: title of y+
 * bottomTitle: title of y-
 * x <required>: x position of point on graph
 * y <required>: y position of point on graph
 * width: width of the graph in pixels
 * height: height of the graph in pixels
 */
export default function Graph(props) {
  // internal definitions
  const width = props.width || 300;
  const height = props.height || 300;
  const xPad = width / 20;
  const yPad = height / 20;
  const fontSize = (width + height) / 60;
  const labelStyle = props.labelStyle || {
    textAnchor: "middle",
    style: {
      font: `bold ${fontSize}px sans-serif`
    }
  };
  // JSX
  return (
    <XYPlot width={width} height={height} style={{margin: "auto"}}
            margin={{bottom: yPad, left: xPad, right: xPad, top: yPad}} >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis hideTicks
	     style={{
	       line: {strokeWidth: 1}
	     }}/>
      <YAxis hideTicks
	     style={{
	       line: {strokeWidth: 1}
	     }}/>
      
      <MarkSeries data={[{x: props.x, y: props.y}]} />
      {/* Invisible data to stretch out the graph */}
      <MarkSeries data={[{x: -100, y: -100}, {x: 100, y: 100}]}
		  opacity={0} opacityType="linear" />
      {/* Axis lines */}
      <LineSeries data={[{x: -100, y: 0}, {x: 100, y: 0}]} />
      <LineSeries data={[{x: 0, y: -100}, {x: 0, y: 100}]} />
      {/* Labels */}
      <ChartLabel text={props.topTitle} yPercent={-0.01} xPercent={0.5}
                  style={{transform: "rotate(0)", ...labelStyle}} />
      <ChartLabel text={props.bottomTitle} yPercent={.94} xPercent={0.5}
                  includeMargin={true}
                  style={{transform: "rotate(0)", ...labelStyle}} />
      <ChartLabel text={props.rightTitle}
                  yPercent={0.5 - (props.rightTitle.length * 0.006)}
                  xPercent={0.96}
                  style={{transform: "rotate(90)", ...labelStyle}} />
      <ChartLabel text={props.leftTitle}
                  yPercent={0.5 - (props.leftTitle.length * 0.006)}
                  xPercent={0.04}
                  style={{transform: "rotate(-90)", ...labelStyle}} />
    </XYPlot>
  );
}

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
 * rightTitle <required>: Title of the x axis
 * topTitle <required>: Title of the y axis
 * x <required>: x position
 * y <required>: y position
 * width: width of the graph in pixels
 * height: height of the graph in pixels
 */
export default function Graph(props) {
  const width = props.width || 300;
  const height = props.height || 300;
  const xPad = width / 20;
  const yPad = height / 20;
  return (
    <div style={{width, height}}>
      <XYPlot width={width - 2 * xPad} height={height - 2 * yPad} style={{margin: "auto"}}>
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
	<LineSeries data={[{x: -100, y: 0}, {x: 100, y: 0}]} />
	<LineSeries data={[{x: 0, y: -100}, {x: 0, y: 100}]} />
      </XYPlot>
    </div>
  );
}

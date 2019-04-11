import React, { Component } from "react";
import _ from "lodash";
import styled from 'styled-components';
import colors from '../../colors';
import {
    PieChart,
    Pie,
    Legend,
    Cell,
    Sector,
    ResponsiveContainer
} from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, percent, value, name
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={12}>{`${name} ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={12}>
        {`${(percent * 100).toFixed()}%`}
      </text>
    </g>
  );
};

const LegendItem = styled.li`
    font-size: 12px;
    text-align: left;
    list-style: none; 
    &:before {
        color: ${props => props.color};
        content: "\\2022";
        font-size: 2em;
        padding-right: 5px; 
        position: relative;
        top: 5px;
    }
`;

const renderLegend = props => {
  const { payload } = props;

  return (
    <ul>
      {
        payload.map((entry, index) => (
          <LegendItem key={`item-${index}`} color={entry.color}>
              {entry.value} ({(entry.payload.percent * 100).toFixed()}%)
          </LegendItem>
        ))
      }
    </ul>
  );
};

export default class RechartsPieChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: -1
        };
    }

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index
        });
    };

    onPieLeave = () => {
      this.setState({
          activeIndex: -1
      });
    };

    render() {
        const { activeIndex } = this.state;
        const { data } = this.props;

        return (
            <ResponsiveContainer>
                <PieChart width={350} height={220}>
                    <text
                        x={235}
                        y={115}
                        fill="#000"
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        {_.sumBy(data, item => item.count)}
                    </text>
                    <text
                        x={235}
                        y={140}
                        fill="#000"
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        Total
                    </text>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        dataKey="count"
                        nameKey="value"
                        data={data}
                        cx={230}
                        cy={120}
                        innerRadius={75}
                        outerRadius={90}
                        onMouseEnter={this.onPieEnter}
                        onMouseLeave={this.onPieLeave}
                    >
                        {
                            data.map((entry, index) =>
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            )
                        }
                    </Pie>
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        iconType="circle"
                        iconSize={8}
                        content={renderLegend}
                    />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

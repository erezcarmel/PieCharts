import React, { Component } from "react";
import {
    VictoryContainer,
    VictoryLegend,
    VictoryPie,
    VictoryTooltip,
    VictoryLabel
} from 'victory';
import colors from '../../colors';
import _ from "lodash";

export default class VictoryPieChart extends Component {
    render() {
        const { data } = this.props;
        return (
            <VictoryContainer>
                <VictoryLegend
                    x={250}
                    y={50}
                    colorScale={colors}
                    orientation="vertical"
                    data={data.map(item => ({name: `${item.value} ${item.count}%`}))}
                    standalone={false}
                    text={(datum) => "x: " + datum.x}
                />
                <VictoryPie
                    labelComponent={<VictoryTooltip />}
                    animate={{
                        duration: 1000,
                        onLoad: {
                            duration: 1000,
                            before: () => ({_y: -1200, label: " "}),
                            after: (datum) => ({_y: datum._y})
                        }
                    }}
                    x="value"
                    y="count"
                    labels={p => `${p.value} ${p.count}`}
                    innerRadius={90}
                    colorScale={colors}
                    data={data}
                    standalone={false}
                    height={250}
                    width={250}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 20 }}
                    x={125}
                    y={125}
                    text={_.sumBy(data, item => item.count)}
                />
            </VictoryContainer >
        )
    }
}
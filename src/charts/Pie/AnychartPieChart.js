import React, { Component } from "react";
import Anychart from "anychart-react";
import anychart from 'anychart'
import colors from '../../colors';
import _ from "lodash";

export default class AnychartPieChart extends Component {
    render() {
        const { data } = this.props;

        let label = anychart.standalones.label();
        label.text(`${_.sumBy(data, item => item.count)}\nTotal`);
        label.width("100%");
        label.height("100%");
        label.fontColor("#000");
        label.fontSize("20px");
        label.hAlign("center");
        label.vAlign("middle");

        return (
            <Anychart
                height={250}
                background={{
                    fill: 'transparent'
                }}
                type="pie"
                data={data.map(item => ({ x: item.value, value: item.count }))}
                innerRadius="85%"
                legend={{
                    itemsLayout: "vertical",
                    position: "right"
                }}
                center={{
                    content: label
                }}
                palette={{
                    items: colors.map(color => ({color}))
                }}
            />
        )
    }
}
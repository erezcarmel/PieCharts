import React, { Component } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import colors from '../../colors';
import _ from "lodash";
import options from './highchart-options';

export default class HighchartPieChart extends Component {
    render() {
        const { data } = this.props;
        const opts = {
            ...options,
            title: {
                ...options.title,
                text: _.sumBy(data, item => item.count),
            },
            colors,
            series: [{
                ...options.series[0],
                data: data.map(item => ({y: item.count, name: item.value}))
            }]
        };

        return (
            <HighchartsReact
                height={250}
                highcharts={Highcharts}
                options={opts}
            />
        )
    }
}
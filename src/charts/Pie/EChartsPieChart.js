import React, { Component } from "react";
import colors from '../../colors';
import ReactEcharts from 'echarts-for-react';
import options from './echarts-options';
import _ from "lodash";

export default class EChartsPieChart extends Component {
    getOption = () => {
        const { data } = this.props;
        let opts = {...options};
        opts.title.text = `${_.sumBy(data, item => item.count)}\nTotal`;
        opts.legend.data = data.map(item => ({name: item.value, icon: 'circle'}));
        opts.series[0].data = data.map((item, index) => ({
            value: item.count,
            name: item.value,
            itemStyle: { color: colors[index] }
        }));
        return opts;
    };

    render() {
        return (
            <ReactEcharts
                style={{height: '260px'}}
                option={this.getOption()}
                opts={{renderer: 'svg'}}
            />
        );
    }
}

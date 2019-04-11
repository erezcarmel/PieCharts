import React, { Component } from "react";
import { RadialChart, DiscreteColorLegend } from 'react-vis';
import colors from '../../colors';
import styled from "styled-components";

const VisLegendContainer = styled.div`
    position: absolute;
    left: 250px;
    top: 140px;
    svg {
        width: 20px;
        height: 5px;
    }
`;

export default class VisPieChart extends Component {
    render() {
        const data = this.props.data.map(item => {
            return {...item, angle: item.count, label: item.value};
        });
        return (
            <RadialChart
                animation
                data={data}
                width={250}
                height={250}
                innerRadius={85}
                radius={100}
                colorRange={colors}
                onValueMouseOver={value => {
                    console.log(value);
                    this.setState({ value })
                }}
                onSeriesMouseOut={() => this.setState({ value: false })}
            >
                <VisLegendContainer>
                    <DiscreteColorLegend
                        height={200}
                        width={300}
                        color={colors}
                        items={data.map(item => ({ title: item.label })) }
                        orientation="vertical"
                    />
                </VisLegendContainer>
            </RadialChart>
        )
    }
}
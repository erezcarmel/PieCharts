import React, { Component } from "react";
import { Sunburst, Hint } from 'react-vis';
import colors from '../../sunburstColors';

const tipStyle = {
    display: 'flex',
    color: '#fff',
    background: '#000',
    alignItems: 'center',
    padding: '5px'
};

const boxStyle = {height: '10px', width: '10px'};

export default class VisSunburstChart extends Component {
    state = {
        hoveredCell: false,
        data: {}
    };

    componentDidMount() {
        const { data } = this.props;
        const children = data.children.map((child, index) => {
            child.color = colors[index].main;
            if (child.children) {
                child.children = child.children.map((item, i) => ({...item, color: colors[index].children[i]}));
            }
            return child;
        });
        this.setState({ data: { ...data, children } });
    }

    buildValue = hoveredCell => {
        const {radius, angle, angle0} = hoveredCell;
        const truedAngle = (angle + angle0) / 2;
        return {
            x: radius * Math.cos(truedAngle),
            y: radius * Math.sin(truedAngle)
        };
    };

    render() {
        const { data, hoveredCell } = this.state;

        return (
            <Sunburst
                animation
                hideRootNode
                onValueMouseOver={() => this.setState({hoveredCell: true})}
                onValueMouseOut={() => this.setState({hoveredCell: false})}
                data={data}
                width={300}
                height={300}
                padAngle={() => 0.02}
            >
                { hoveredCell ? (
                    <Hint value={this.buildValue(hoveredCell)}>
                        <div style={tipStyle}>
                            <div style={{...boxStyle, background: hoveredCell.clr}} />
                            {hoveredCell.clr}
                        </div>
                    </Hint>
                ) : null}
            </Sunburst>
        )
    }
}
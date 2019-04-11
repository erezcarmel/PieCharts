import React from "react";
import {
    RechartsPieChart,
    VictoryPieChart,
    EChartsPieChart,
    VisPieChart,
    VisSunburstChart,
    AnychartPieChart,
    HighchartPieChart,
    RechartsSunburstChart
} from "./Pie";
import ChartContainer from './ChartContainer';
import styled from 'styled-components';
import sunburstData from '../sunburstData';
import data from '../data';
import conclusions from '../conclusions';

const ChartsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
`;

const Charts = () => (
  <ChartsContainer>
      <ChartContainer info={conclusions.recharts}>
          <RechartsPieChart data={data}/>
      </ChartContainer>

      <ChartContainer info={conclusions.victory}>
          <VictoryPieChart data={data}/>
      </ChartContainer>

      <ChartContainer info={conclusions.vis}>
          <VisPieChart data={data}/>
      </ChartContainer>

      <ChartContainer info={conclusions.echarts}>
          <EChartsPieChart data={data}/>
      </ChartContainer>

      <ChartContainer info={conclusions.anychart}>
          <AnychartPieChart data={data}/>
      </ChartContainer>

      <ChartContainer info={conclusions.highchart}>
          <HighchartPieChart data={data}/>
      </ChartContainer>

      {/*<ChartContainer info={conclusions.recharts}>*/}
          {/*<RechartsSunburstChart data={data}/>*/}
      {/*</ChartContainer>*/}

      {/*<ChartContainer info={conclusions.vis}>*/}
          {/*<VisSunburstChart data={sunburstData}/>*/}
      {/*</ChartContainer>*/}
  </ChartsContainer>
);

export default Charts;

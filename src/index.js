import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Chart from "./charts";

const AppContainer = styled.div`
    font-family: sans-serif;
`;

function App() {
  return (
    <AppContainer>
      <Chart />
    </AppContainer>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

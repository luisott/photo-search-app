import React from 'react';
import logo from '../logo.svg';
import AppBar from '@material-ui/core/AppBar';
import StyledComponents from 'styled-components';

export const MyWrapperDiv = StyledComponents.div`
  background-color: red;
  height: 50px;
  width: 50px;
`;

const App = () => {
  return (
      <div>
        <AppBar color="primary" position="static">
          <MyWrapperDiv>SomeWrapper div</MyWrapperDiv>
        </AppBar>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
  );
};

export default App;

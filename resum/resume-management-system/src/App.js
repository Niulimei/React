import React, { Component } from 'react'
import './App.css';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="App-header">
          <h1>上海亮金信息技术有限公司简历管理系统</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          {/* To get started, edit <code>src/App.js</code> and save to reload. */}
        </p>
      </div>
    );
  }
}

export default App;

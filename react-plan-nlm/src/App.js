import React, { Component } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { Provider, connect } from 'react-redux';

// Provider--提供store
// React 通过Context属性，可以将属性(props)直接给子孙component,无须通过props层层传递，Provider仅仅起到获得store,然后将其传递给子孙元素而已
import store from './redux/store.js';

//引入4个模块组件
import Home from './components/home.js';
import Popup from './components/pupop.js';
import TestRouter from './components/testrouter.js';
import Detail from './components/detail.js';
import Plan from './components/plan.js';
//引入样式文件
import './App.css';
import './components/comment.css';
//引入路由
import createHistory from 'history/createBrowserHistory';
const history = createHistory()


//开始代码

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>我的XX</h2>
          </div>
          <div>
            {/* 路由配置 */}
            <Router history={history}>
              <div className="contentBox">
                {/*编写导航 */}
                <ul className="nav">
                  <li><Link to="/">首页</Link></li>
                  <li><Link to="/plan">计划表</Link></li>
                  <li><Link to="/test">二级路由</Link></li>
                </ul>
                {/*路由匹配*/}
                <div className="content">
                  <Route exact path="/" component={Home} />
                  <Route path="/plan" component={Plan} />
                  <Route path="/test" component={TestRouter} />
                  <Route path="/detail/:id" component={Detail} />
                </div>
              </div>
            </Router>
          </div>
          <Popup />
        </div>
      </Provider>
    );
  }
}

export default App;

import React from 'react'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// redux-thunk让操作创建者通过调度函数来反转控制。他们会收到 dispatch一个参数，可以异步地称之为它。这样的功能叫做thunk。


// ...middleware:符合Redux中间件API的函数。每一个中间件接收 Store 的 dispatch和 getState 功能命名的参数，并返回一个函数。该函数将被赋予next中间件的调度方法，并且预期返回
// 一个具有潜在不同参数的action调用功能 next(action），或者在不同的时间，或者根本不会调用它。链中的最后一个中间件将接受真实存储的dispatch方法作为next参数，从而结束链。所以
// 中间件签名是 ({getState,dispatch}) => next =>action
// import { Router } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import Routers from './Router';
import createHistory from 'history/createBrowserHistory'
// 需要安装： npm install --save history
// 使用 ES6 modules:  import createHistory from 'history/createBrowserHistory'
const history = createHistory()//创建你选择的历史记录（使用浏览器历史记录）
const middleware = routerMiddleware(history)//构建用于拦截和调度导航操作的中间件

const store = createStore(
    combineReducers({
        // ...reducers,
        router: routerReducer
    }),
    // applyMiddleware() tells createStore() how to handle middleware
    applyMiddleware(thunk, middleware)
);

//对于单一的中间件：
// export default store => next => action =>{
// console.log('beforeState',store.getState())
// next(action)
// console.log('nextState',store.getState())
// }
// 当我们执行了next(action)后，相当于调用原始store dispatch方法，并且将action传入其中，可想而知，下一行输出的state已经是更新后的了

ReactDOM.render(
    <Provider store={store}>
        <Routers />
    </Provider>,
    document.getElementById('root')
);




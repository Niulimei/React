import React, { Component } from 'react';
import './style/home.css';
class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>首页</h2>
                <p>这是一个学习React的小例子</p>
                <p>主要想学习 React-Router、redux的基本用法</p>
                <p>同时想用这个例子给自己的小项目做个起步</p>
                <br />
                <br />
                <br />
            </div>
        )
    }
}

export default Home
import react, { Component } from 'react'
import './style/topmenu.css'
// import logo from '../logo.svg';

class TopMenu extends Component {
    render() {
        return (
            <div className="TopMenu">

                <div className="TopMenu-header">
                    <h1>上海亮金信息技术有限公司简历管理系统222</h1>
                    <img src={logo} className="TopMenu-logo" alt="logo" />
                </div>
                <p className="TopMenu-intro">
                    {/* To get started, edit <code>src/App.js</code> and save to reload. */}
                </p>
            </div>
        );
    }
}

export default TopMenu;

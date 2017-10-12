import React, { Component } from 'react'
import { Router, Route, BrowserRouter, Link } from 'react-router-dom'
import App from './App.js';
import Home from './Home.js';


// const routes = {
//     path: '/', component: App,
//     indexRoute: { component: Home },
//     // childRoutes:[
//     //     { path:'detail',component:Detail },

//     // ]
// }
//引入路由
import createHistory from 'history/createBrowserHistory';
const history = createHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path='/' component={App} />
                    <Route path='/home' component={Home} />
                </div>
            </Router>
        )
    }
}

export default Routers;


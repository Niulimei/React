import React, { Component } from 'react';
import { connect } from 'react-redux';
import { show, deletePlan } from '../actions/plan.js';
import store from '../redux/store.js';

class Plan extends Component {
    constructor(props) {
        super(props);
        console.log("====props===>", props)
    }

    show() {
        console.log("====this.props===>", this.props)
        let b = this.props.planlist.show;
        store.dispatch(show(!b));
    }

    delete(id) {
        //store调用dispatch，通过action把变更的信息传递给reducer
        store.dispatch(deletePlan(id));
    }
    detail(id) {
        this.props.history.push(`/detail/${id}`)
    }

    render() {
        return (
            <div>
                <div className="plant">
                    <h3>计划表</h3>
                    <p onClick={this.show.bind(this)}>添加计划</p>
                </div>
                <table className="planlist">
                    <thead>
                        <tr>
                            <th>标题</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.planlist.planlist.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="plan-title" onClick={this.detail.bind(this, item.id)}>{item.title}</td>
                                        <td className="plan-delete" onClick={this.delete.bind(this, item.id)} >删除</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

//mapStateToProps负责的任务就是返回需要传递的子组件state
const mapStateToProps = function (store) {
    return {
        planlist: store.planlist
    };
};

// connect将 state和dispath转化为props传递到React组件上,返回给我们使用

// connect是一个高阶函数，首先传入mapStateToProps、mapDispatchToProps,然后返回一个生产Component的函数，
// 然后再将真正的Component作为参数传入，这样就生产出一个经过包裹的Connect组件，该组件具有如下特点：
// 1. 通过this.context获取祖先Component的Store
// 2. props包括stateProps、dispatchProps、parentProps,合并在一起得到nextState，作为props传给真正的Component
// 3. componentDidMount时，添加事件this.store.subscribe(this.handleChange),实现页面交互
// 4. shouldComponentUpdate时判断是否有避免进行渲染，提升页面性能，并得到nextState
// 5. componentWillUnmount时移除注册的事件this.handleChange
// 6. 在非生产环境下，带有热重载功能
export default connect(mapStateToProps)(Plan);  // 产生经过包裹的Connect组件
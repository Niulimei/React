import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store.js';

class Detail extends Component {
    constructor(props) {
        super(props);
        console.log("=====props===>", props)
        //filter()：遍历数组，在每一项元素后面触发一个回调函数，通过判断，保留或移除当前项，最后返回一个新数组！数组！数组！！！
        let item = props.planlist.planlist.filter((data) => data.id == props.match.params.id)
        console.log("===item==>", item);
        this.state = {
            plan: item[0]
        }
    }
    render() {
        return (
            <div style={{ padding: '20px' }}>
                <h3>计划详情</h3>
                <p>id: {this.state.plan.id}</p>
                <p>标题: {this.state.plan.title}</p>
                <p>内容: {this.state.plan.content}</p>
            </div>
        )
    }
}

// mapStateToProps 需要负责的事情就是 返回需要传递给子组件State
const mapStateToProps = function (store) {
    return {
        planlist: store.planlist
    };
};

export default connect(mapStateToProps)(Detail);
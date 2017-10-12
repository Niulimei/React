import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store.js';
import { show, addPlan } from '../actions/plan.js';

class Pupop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '1',
            content: '1'
        }
    }

    close() {
        // b 就是我们需要的所有数据，这些数据从哪里来来的呢，在App.js中store中注入过来的
        let b = this.props.planlist.show;
        this.setState({ id: '', title: '', content: '' });
        store.dispatch(show(!b));
        console.log("====this.props.planlist.show=>", b);
    }

    conform() {
        console.log(this.state);
        store.dispatch(addPlan(this.state));
        this.setState({
            id: '',
            title: '',
            content: ''
        })
        this.close();
    }

    handleChange(str, e) {
        this.setState({
            //ceil() 方法执行的是向上取整计算，它返回的是大于或等于函数参数，并且与之最接近的整数。
            // 例如：Math.ceil(0.60)==> 1
            // Math.ceil(5.1)==>6
            id: Math.ceil(Math.random() * 1000),
            [str]: e.target.value
        })
    }

    render() {
        return (
            <section>
                <div className="popup" style={this.props.planlist.show ? {} : { display: "none" }}>
                    <div className="pbox">
                        <span className="close" onClick={this.close.bind(this)}>X</span>
                        <div>
                            <h4>计划标题</h4>
                            <input onChange={this.handleChange.bind(this, 'title')} value={this.state.title} placeholder="请输入计划标题" />
                        </div>
                        <div>
                            <h4>计划内容</h4>
                            <textarea onChange={this.handleChange.bind(this, 'content')} value={this.state.content} placeholder="请输入计划内容" rows="3"></textarea>
                        </div>
                        <div className="pBtn">
                            <span onClick={this.close.bind(this)} >取消</span>
                            <span onClick={this.conform.bind(this)}>确认</span>
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}

// mapStateToProps是一个普通的函数。当它被connect调用的时候会为它传递一个参数State。字面意思是，匹配一个state给组件。
// mapStateToProps 需要负责的事情就是 返回需要传递给子组件State，返回需要传递给子组件State，返回需要传递给子组件State。
// 然后connect会拿到返回的数据写入到React组件中，然后组件中就可以通过props读取数据啦！！！！

const mapStateToProps = function (store) {
    return {
        planlist: store.planlist  //返回数据
    }
}

// provider从store那里拿来了数据，给connect,让它把这些数据传递给组件。
// connect 会把State和dispatch转换成props传递给子组件。
// connect 会让我们传递一些参数：mapStateToProps，mapDispatchToProps和一些React组件
//之后这个方法进行一系列的黑魔法，把state,dispatch转化成props传递到React组件上，返回给我们使用。
export default connect(mapStateToProps)(Pupop)


// mapDispatchToProps字面意思：匹配dispatch给组件。
// 与mapStateToProps很像，接收store中的dispatch和props，使页面可以复写dispatch方法。
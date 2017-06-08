# React 入门

## state 和 props

`state` 可根据用户与应用网站的交互来改变，当用户与应用网站交互时会有不同的state，不同的state会触发更新用户界面和数据,对于需要更改的数据，我们需要使用state。一般来说，需要在constructor中初始化state,然后在需要修改时调用setState方法。然而 ` props` 是组件的属性，是不可更改的，只可读，用于传递数据。      

## render 方法

render 方法是组件唯一一个必须的方法，它会创建一个虚拟DOM，用来表示组件的输出。`注意：`

1. 只能通过this.props和this.state访问数据；

2. 只能返回一个节点，例如：

```
错误：//有两个节点
render(){
return(
  <h1>欢迎来到组件 </h1>
  <h1>欢迎使用React<h1>
  );
}

正确：//将两个节点的h1放入到一个节点div中
render(){
  return(
    <div>
    <h1>欢迎来到组件</h1>
    <h1>欢迎使用React</h1>
    </div>
  );
}

```

## 组件的声明周期

组件分为已插入真实DOM，正在被重新渲染，已经移出真实DOM等三个状态。React为每个状态都提供了两种处理函数，will函数在进入之前调用，did函数在进入状态之后调用，对应的方法有：     

```
componentWillMount()

componentDidMount()//页面被渲染后执行

componentWillUpdate(object nextProps,object nextState)

componentDidUpdate(object prevProps,object prevState)

componentWillUnmount()


```


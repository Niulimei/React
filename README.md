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

## 组件的生命周期

组件分为已插入真实DOM，正在被重新渲染，已经移出真实DOM等三个状态。React为每个状态都提供了两种处理函数，will函数在进入之前调用，did函数在进入状态之后调用，对应的方法有：     

```
componentWillMount() 

componentDidMount()//页面被渲染后执行

componentWillUpdate(object nextProps,object nextState)

componentDidUpdate(object prevProps,object prevState)

componentWillUnmount()


```

## React 与 Ajax

React 只负责处理View这一层，它本身不涉及网络请求，所以这里我们需要考虑两个问题：    

- 第一，用什么技术从服务端获取数据；   

- 第二，获取到的数据应该放在React组件的什么位置。   

React官方提供了一种解决方案：Load Initial Data via AJAX     

使用jQuery的Ajax方法，在组件的 ` componentDidMout()`中发ajax请求，拿到的数据存放在组件自己的`state`中,并调用setState方法去更新UI。如果是异步获取数据，则在`componentWillUnmout`中取消发送请求。   

如果我们只是为了使用jQuery的Ajax方法就引入整个jQuery库，既是一种浪费又加大了整个应用的体积，这时候我们还有很多方法去实现，比如：`fetch()、fetch polyfill、axios...` 其中最需要我们关注的是`window.fetch()`,它是一个简洁、标准化的javascript的AjaxAPI。      

React官方文档只告诉了我们一个单一组件中如何通过ajax从服务器端获取数据，但是并没有告诉我们在一个完整的实际项目中到底应该吧数据存在哪些组件中，如果缺乏规范的话会使项目不见得混乱、难以维护。      

- 举一个具体例子

假如我们需要展示用户的姓名和头像，首先创建一个展示性组件`<UserProfile/>`,接受两个Props:`name`和`profileImage`。这个组件没有任何关于Ajax的代码。     

然后创建一个容器组件`<UserProfileContainer/>` 他接受一个`userId`的参数，发送Ajax请求从服务器获取数据存在`state`中，再通过`props`传给`<UserProfile>`组件。   

- 使用Redux或Relay的情况   

Redux管理状态和数据，Ajax从服务器端获取数据，所以很显然当我们使用了Redux时，应该把所有的网络请求都交给Redux来解决。具体来说，应该是放在Async Actions。如果用其他类Flux库的话，解决方式差不多，都是在action中发送网络请求。    

### 一个标准组件的组织结构

```
1. class definition              //定义组件名
   1.1 constructor              //每个组件中设置state的初始值都要使用constructor
       1.1.1 event handlers     //向constructor中放入事件处理的内容，主要是为state设初始值
   1.2 ’component‘ lifecycle events     //组件的生命周期事件
   1.3  getters     //获取
   1.4  render      //渲染
2. defaultProps     //默认属性
3. proptypes        //属性类型
```

- 实例

```
class Person extends React.Component{
  constructor(props){  //在React class 中设置state 的初始值或绑定事件时需要加constructor()
    super(props);     //使用到this关键字的需要加super()
    this.state = {smiling:false};
    this.handleClick = ()=>{
      this.setState({smiling:!this.state.smiling});
    };
  }
  componentWillMount(){
   /添加事件监听（Flux Store,WebSocket,document,etc.）
  },
  componentDidMount(){
  // React.getDOMNode()
  },
  componentwillUnmount(){
  //取消事件监听(Flux Store,WebSocket,document,.etc.)
  },
  get smilingMessage(){
  return (this.state.smiling)?"is smiling":"";
  }
  render(){
    return(
      <div onClick={this.handleClick}>
        {this.props.name} {this.smilingMessage}
      </div>
    );
  },
}

Person.defaultProps ={
  name:'Gues'
};
Person.propTypes = {
  name:React.PropTypes.string
};
```

- 能用三元判断，就不用if，直接放在render()里

```
render(){
  return(
    <div>
       {this.props.name}
       {(this.state.smiling)?<span>is smiling</span>:null}
    </div>
  );
}
```

- 如何动态处理classNames
1. 使用布尔

```
constructor(){
    this.state={
     isActive:false //使用bool值
    };
}
handleClick(){
     this.setState({isAction:!this.state.isAction});
}
```


# React.createClass和extends Component的区别

createClass本质上是一个工厂函数，extends 的方法更接近最新的ES6规范的class写法。两种方法在语法上的差别主要体现在方法的定义和静态属性的声明上。createClass方式的方法定义使用逗号，隔开，因为createClass本质是一个函数，传递给它的是一个Object；而class的方式定义方法时务必谨记不要用逗号隔开，这是ES6 class的语法规范。      

React.createClass和extends Component的区别主要在于：    

1. 语法区别

2. propType和getDefaultProps

3. 状态的区别

4. this区别

5. Mixins

## 语法区别

React.createClass    

```
import React from 'react';

const Contacts = React.createClass({
  render(){
    return(
      <div></div>
    );
  }
});

export default Contacts;
```

React.Component      

```
import React from 'react';

class Contacts extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div></div>
    );
  }
}

export default Contacts;
```

后一种class 方法使用的是ES6的语法，用`constructor`构造器来构造默认的属性和状态。      

## propType和getDefaultProps

React.createClass:通过`propTypes`对象和`getDefaultProps()`方法来设置和获取`props`。     

```
import React from 'react';

const Contacts = React.createClass({
  propTypes:{
    name:React.PropTypes.string
  },
  getDefaultProps(){
    return {

    };
  },
  render(){
    return (
      <div></div>
    );
  }
});

export default Contacts;

```

React.Component:通过设置两个属性`propTypes`和 `defaultProps`   

```
import React from 'react';

class TodoItem extends React.Component{
  static propTypes = {
    name:React.PropTypes.string
  };
  static defaultProps = {
    name:''
  };
  constructor(props){
    super(props)
  }
  render(){
    return <div></div>
  }
}

```

## 状态的区别

React.createClass:通过`getInitialState()`方法返回一个包含初始值得对象   

```
import TodoItem = React.createClass({
  getInitialState(){
    return {
      isEditing:false
    }
  }
  render(){
    return <div></div>
  }
});
```

React.Component:通过`constructor`设置初始状态     

```
import React from 'react';
class TodeItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isEditing:false
    }
  }
  render(){
      return <div></div>
  }
}
```

## this区别

React.createClass:会正确绑定`this`    

```
import React from 'react';

const Contacts = React.createClass({
  handleClick(){
    console.log(this);
  },
  render(){
    return(
    <div onClick={this.handleClick}></div>
    );
  }
});

export default Contacts;
```

React.Component:由于使用了ES6，这里会有些微不同，属性并不会自动绑定到React类的实例上。      

```
import React from 'react';
 class TodoItem extends React.Component{
    constructor(props){
      super(props);
    }
    handleClick(){
      console.log(this);
    }
    handleFocus(){
      console.log(this);
    }
    handleBlur:()=>{
      console.log(this);
    }
    render(){
      return <input onClick={this.handleClick}   //不能够准确绑定到handleClick
                            onFocus={this.handleFocus.bind(this)}//不能够准确绑定到handleClick
                            onBlur={this.handleBlur}/> //不能够准确绑定到handleClick
    }
 }
```

我们还可以在constructor中来改变this.handleClick执行的上下文，这应该是相对上面一种来说更好的办法，万一我们需要改变语法结构，这种方式完全不需要去改动JSX的部分：     

```
import React from 'react';

class Contacts extends React.Component{
  constructor(props){
  super(props);
  this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    console.log(this);
  }
  render(){
    return(
        <div onClick={this.handleClick}></div>
    );
  }
}

export default Contacts;
```

## Mixins

如果我们使用ES6的方式来创建组件，那么`React mixins`的特性不能被使用了。      

React.createClass:使用React.createClass的话，我们可以在创建组件时添加一个叫做`mixins`的属性，并将可供混合的类的集合以数组的形式赋给`mixins`。  

```
import React from 'react';
let MyMixin = {
  doSomething(){}
}
let TodoItem = React.createClass({
    mixins:[MyMixin],
    render(){
      return <div></div>
    }
})
```

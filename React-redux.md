# React-redux

## 一、UI组件

React-Redux将所有组件分成两大类：`UI组件`和`容器组件`。 UI组件有以下几个特征。     

- 只负责UI的呈现，不带有任何业务逻辑   

- 没有状态（即不使用this.state这个变量）      

- 所有数据都由（this.props）提供   

- 不使用任何 Redux 的 API     

例如：  

```
const Title = value =><h1>{value}</h1>;
```

因为不含有状态，UI组件又称为“纯组件”，即和纯函数一样，纯粹由参数决定它的值。     

## 二、容器组件 

容器组件的特征恰恰相反。    

- 负责管理数据和业务逻辑，不负责 UI 的呈现   

- 带有内部状态   

- 使用 Redux 的 API   


`总之，只要记住一句话就可以了：UI组件负责UI的呈现，容器组件负责管理数据和逻辑。`   

但是，如果一个组件既有UI又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：`外面是一个容器组件，里面包含了一个UI组件。`前者负责与外部的通信，将数据传给后者，由后者渲染出视图。     
 
React-Redux 规定，所有的UI组件都由用户提供，容器组件则是由React-Redux自动生成。也就是说，用户负责视觉层，状态管理则全部交给它。   

## connect()

React-Redux提供`connect`方法，用于从UI组件生成容器组件。connect的意思就是将两种组件连接起来。    

```
import { connect } from 'react-redux';

const VisibleTodoList = connect()(TodoList);
```

上面代码中，`TodoList`是UI组件，`VisibleTodoList`就是由React-Redux通过`connect`方法自动生成的容器组件。     

但是，因为没有定义业务逻辑，上面的这个容器组件毫无意义，只是UI组件的一个单纯的包装层。为了定义业务逻辑，需要给出下面两方面的信息。    

1. 输入逻辑：外部的数据（即`state`对象）如何转换为UI组件的参数     

2. 输出逻辑：用户发出的动作如何变为 Action 对象，从UI 组件传出去。     

因此，`connect`方法的完整API如下。      

```
import { connect } from 'react-redux';

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```

上面代码中，`connect`方法接受两个参数：`mapStateToProps` 和 `mapDipatchToProps`。它们定义了UI组件的业务逻辑。前者负责输入逻辑，即将`state` 映射到UI组件的参数(`props`),后者负责输出逻辑，即 将用户对UI组件的操作映射成Action。    

## 四、mapStateToProps()

`mapStateToProps` 是一个函数。他的作用就是像它名字那样，建立一个（外部的）`state`对象到(UI组件的)`props`对象的映射关系。    

作为函数，`mapStateToProps` 执行后应该返回一个对象，里面的每一个键值就是一个映射。请看下面的例子：     

```
const mapStateToProps = (state) => {
  return {
    todos:getVsibleTodos(state.todos,state.visibilityFilter)
  }
}
```

上面代码中。mapStateToProps 是一个函数，他接受 `state` 作为参数，返回一个对象。这个对象有一个`todos`属性，代表UI组件的同名参数，后面的getVisibleTodos 也是一个函数，可以从`state`算出`todos`的值。    
下面就是`getVisibleTodos`的一个例子，用来算出`todos`。    

```
const getVisibleTodos = (todos,filter) =>{
  switch(filter){
    case'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t =>t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter:'+ filer)
  }
}
```

`mapStateToProps`会订阅 Store,每当`state`更新的时候，就会自动执行，重新计算UI组件的参数，从而触发UI钻进的重新渲染。    

`mapStateToProps`的第一个参数总是`state`对象，还可以使用第二个参数，代表容器组件的`props`对象。    

```
//容器组件的代码
//  <FilterLink filter = "SHOW_ALL">
//  All
//  </FilterLink>

const mapStateToProps = (state,ownProps) =>{
  return {
    active:ownProps.filter === state.visibilityFilter
  }
}
```

使用`ownProps`作为参数后，如果容器组件的参数发生变化，也会引发UI组件重新渲染。      

`connect`方法可以省略`mapStateToProps`参数，那样的话，UI组件就不会订阅Store，就是说Store的更新不会引起UI组件的更新。   

## 五、mapDispatchToProps()

`mapDispatchToProps`是`connect`函数的第二个参数，用来建立UI组件的参数到`store.dispatch`方法的映射。也就是说，它定义了哪些用户的`操作`应当作为Action，传给Store。它可以是一个函数，也可以是一个对象。            

如果`mapDispatchToProps`是一个函数，会得到`dispatch`和`ownProps`(容器组件的`props`对象)两个参数。   

```
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick:() =>{
      dispatch({
        type:'SET_VISIBILITY_FILTER',
        fileter:ownProps.filter
      });
    }
  };
}
```

从上面代码可以看到，`mapDispatchToProps`作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了UI组件的参数怎样发出Action。   

如果`mapDispatchToProps`是一个对象，他的每一个键名也是对应UI组件的同名参数，键值应该是一个函数，会被当做Action creator，返回的Action会由Redux自动发出。举例来说，上面的`mapDispatchToProps` 写成对象就是下面这样。     

```
const mapDispatchToProps = {
  onClick:(filter) =>{
    type:'SET_VISIBILITY_FILTER',
    filter:filter
  };
}
```

## <Provider> 组件   

`connect` 方法生成容器组件以后，需要让容器组件拿到`state`对象，才能生成UI组件的参数。    

一种解决方法是将`state` 对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级一级将`state`传下去就很麻烦。    

React-Redux提供`Provider`组件，可以让容器组件拿到`state`。      

```
import { Provider } from 'react-redux'

import { createStore } from 'redux'

import todoApp from './reducers'

import App from './components/App'

let store = createStore(todoApp);

render(
  <Provider store = {store}>
    <App />
  </Provider>
  documnet.getElementById('root')
)

```

上面代码中，`Provider` 在根组件外面包了一层，这样一来，`App` 的所有子组件就默认都拿到`state`了。    

它的原理是`React`组件的`context`属性。     

```
class Provider extends Component {
  getChildContext(){
    return {
      store:this.props.store
    };
  }
  render(){
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store:React.PropTypes.object
}
```

上面代码中，`store`放在了上下文对象`context`上面。然后，子组件就可以从`context`拿到`store`,代码大致如下。        

```
class VisibleTodoList extends Component {
  componentDidMount(){
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  render(){
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
  }
}

VisibleTodoList.contextTypes = {
  store:React.PropTypes.object
}
```

`React-Redux` 自动生成的容器组件的代码，就类似上面这样，从而拿到`store`。     

## 七、实例：计数器

我们来看一个实例。下面是一个计数器组件，它是一个纯的UI组件。       

```
class Counter extends Component {
  render(){
    const { value,onIncreaseClick } = this.props
    return(
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}
```

上面代码中，这个UI组件有两个参数：`value`和`onIncreaseClick`。前者需要从`state`计算得到，后者需要向外发出Action。   
接着，定义`value`到`state`的映射，以及`onIncreaseClick`到`dispatch`的映射。     

```
function mapStateToProps(state){
  return {
    value:state.count
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () =>dispatch(increaseAction)
  }
}
const increaseAction = { type:'increase' }

```

然后，使用`connect`方法生成容器组件。     

```
const App = connect(mapStateToProps,mapDispatchToProps)(Counter)
```

然后，定义这个组件的Reducer。

```
function counter(state = { count:0 },action){
  const count = state.count
  switch(action.type){
    case:'increase':
      return { count:count + 1 }
    default:
      return state
  }
}
```

最后，生成`store`对象，并使用`Provider` 在根组件外面包一层。      

```
import { loadState,saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(
  todoApp,
  persistedState
);

store.subscribe(throttle(() =>{
  saveState({
    todos:store.getState().todos,
  })
},1000))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```


## 八、React-Router路由库

使用`React-Router`的项目，与其他项目没有不同之处，也是使用`Provider`在`Router`外面包一层，毕竟`Provider`的唯一功能就是传入`store`对象。     

```
const Root = ({ store }) =>(
  <Provider store={store}>
    <Router>
      <Route path="/" component ={App} />
    </Router>
  </Provider>
);

```

dispatch后立刻修改state：    

```
function dispatch(action){
  ...
  currentState = currentReducer(currentState,action)
  ...

}
```

## 多中间件的场景

我们假设有三个中间件 fn1 fn2 fn3，从源码的两句入手：

```
  chain = middlewares.map(middleware =>middleware(middlewareAPI))
  dispatch = compose(...chain)(store.dispatch)

```

第一行代码，我们得到了只剩下 next =>action 参数的chain，暂时叫做：    

```
cfnx = fnx(middlewareAPI)   
```


第二行代码展开后是这样的：   

```
dispatch = cfn1(cfn2(cfn3(store.dispatch)))
```

可以看到最后传入的中间件 fn3是最先执行。     

为了便于后面理解，我先把上面代码的含义写出来：通过传入原始的store.dispatch，希望通过层层中间件的调用，最后产生一个新的dispatch。那么实际上，中间件组成的dispatch，从函数角度看，就是被执行过一次cfn1 cfn2 cfn3函数。     

我们就算不理解新dispatch的含义，也可以从代码角度理解：只要执行了新的dispatch，中间件函数 cfnx系列就要被执行一次，所以 cfnx 的函数本身就是中间的 dispatch.   

对应 cfn3的代码可能是：  

```
  export default next =action ={
  next(action)
  }
```

这就是中间件的dispatch。   



## 为什么我们在中间件中执行 next(action)，下一步就能拿到修改过的store？


对于cfn3来说，next就是store.dispatch。我们先不考虑它为什么是next，但是执行它了就会直接store.dispatch,后面立马拿到修改后的数据不奇怪吧。     

对于cfn2来说，next就是cfn3执行后的返回值（执行后也还是个函数，内层并没有执行）我们分两种情况：    

1. cfn3没有执行next(action)，那cfn1 cfn2都没有执行store.dispatch,因为原始的dispatch没有传递下去，你会发现dispatch函数被中间件搞失效了（所以中间件还可以捣乱）。为了防止中间件瞎捣乱，在中间件正常的情况请执行next(action).     

```
 这就是 redux-thunk 的核心思想，如果action是个function，就是故意执行action，而不执行next(action),等于让store.dispatch失效了！但其目的是明确的，因为会把dispatch返回给用户，让用户自己调用，正常使用是不会把流程停下来的。

```


![原文链接：redux applyMiddleware 原理剖析](http://www.jianshu.com/p/47887299cabb)
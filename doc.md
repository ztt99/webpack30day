## babel-polyfill

babel默认只转换新的js语法，不转换api，比如：promise等。引入polyfill就可以转换了，但是polyfill的原理是在原型对象上添加该方法

## @babel/preset-env

为每个环境的预设

## @babel/polyfill

```js
require("@babel/polyfill");
```

```js
// 现在用这种方式
import "core-js";
```

全量引入polyfill,babel 7.4已经弃用这种方式


https://babeljs.io/docs/babel-preset-env

## @babel/runtime

babel为了解决全局空间污染的问题，提供了单独的包，用以提供编译模块的工具函数。比如使用Promide，相当于用代码实现了一个Promise，不会挂载到原型对象上。比如使用Promise，那就引用一下 `@babel/runtime/xxx`

## @babel/plugin-transform-runtime

如果使用`@babel/runtime` 那么使用什么，就需要手动引入。所以出现了` @babel/plugin-transform-runtime`插件。会扫描源代码，自动引入工具函数


## @babel/runtime 与 polyfill

`@babel/runtime` 比较大，因为函数都是重新写的。

`polyfill` 比较小，因为是在原型对象上写
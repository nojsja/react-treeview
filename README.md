## react-treeview
>React Tree View Component, Configurable, Customizable.

#### How To Use ?
_________________

```js
// install
npm install --save react-treeview;

// import
import SourceTree from 'react-treeview';

// instantiation
<SourceTree
  setActiveItem={this.setActiveItem}
  baseIcon={null}
  baseColor={null}
  checkable={true}
  singleChecked={true}
  treeData={treeData}
  getChecked={this.getChecked}
/>

```

#### Attributes
________________

1. treeData - [Array] - isRequired
> data the component needs to build the tree view.

2. baseIcon - [String]
> you can customize icon of the base-item(which flag is 'base' or not declared in treeData, also called default icon, all icon you can found in [semantic](https://react.semantic-ui.com/elements/icon).

3. baseColor - [String]
> you can customize icon color for baseIcon.

4. checkable - [Bool]
> the component supports selection for  all tree nodes, default it's multiselect status, also it can be singleselect by singleChecked attr below.

5. singleChecked - [Bool]
> both checkable and singleChecked attr need to be true if you want to use single checkbox, only tree nodes which flag attr is not 'base' and none can be chosen.

6. getChecked - [Function callback]
> if the component is in single or multi status, the getChecked fuction(you define) will be called when user select or deselect any tree nodes. in your own getChecked func,
just 'console.log(arguments)', and you can get checkedArray(all seleced item) data and rootItem(the root node of the checked) data.

7. setActiveItem - [Function callback]
> any time, you click the tree nodes, the setActiveItem func(you define) will be called. in your own getChecked func,
just 'console.log(arguments)', and you can get item(item you clicked) data, flag(see some flag in 'treeData example' below) data and root(the root of item you clicked) data.

#### treeData
_____________________
1. flag - [base | file | table]
> default it's 'base', other choises: 'file', 'table'(just three current), different flag has different icon, lick 'base', it's  a folder(default).
in setActiveItem func you can get the flag of tree node.

2. name
> name is isRequired, it doesn't matter whether repeat name exits.

3. children
> the children nodes of curren node.

4. example
```js
treeData: [
  {
    name: 'index',
    flag: 'base',
    children: [
      {name: 'solej'},
      {
        name: 'sdfds',
        children: [
          {name: 'exits', children: [{name: 'lalal', flag: 'table'}]},
          {name: '_default_', flag: 'file'},
          {name: 'exits2', children: [{name: 'lalal2', flag: 'table'}]},
        ]
      }
    ]
  },

  {
    name: '23qe2jewrjsdf-sdfjksdfsjdf-sdfkjsdfjsd',
    flag: 'base',
    children: [
      {name: 'sdf'},
      {
        name: 'dkdkdkd',
        children: [
          {name: 'cayman-sdfjksdfjkdk-sdfsdfkdkd-dk',flag: 'table'},
          {name: '_default_', flag: 'table'}
        ]
      }
    ]
  }
]
```

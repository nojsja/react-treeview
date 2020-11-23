'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootListItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _semanticUiReact = require('semantic-ui-react');

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ------------------- 资源树第一层根节点 ------------------- */
var RootListItem = exports.RootListItem = function (_Component) {
  _inherits(RootListItem, _Component);

  function RootListItem(props) {
    _classCallCheck(this, RootListItem);

    var _this = _possibleConstructorReturn(this, (RootListItem.__proto__ || Object.getPrototypeOf(RootListItem)).call(this, props));

    _this.state_clone = {

      child_name: { // 这个根节点下的所有层级的子节点
        father: 'name', // 本级节点的父级节点名
        checked: false, // 选中状态
        isFolding: true, // 折叠状态
        children: ['child1', 'child2', 'child3'] // 本级节点的包含的所有子节点
      }
    };
    _this.index = 0;
    _this.flagMap = { // 根据节点flag选择icon 和 color
      base: {
        icon: 'folder',
        color: 'yellow'
      },
      base_toggle: {
        icon: 'folder open',
        color: 'yellow'
      },
      table: {
        icon: 'table',
        color: 'blue'
      },
      file: {
        icon: 'file outline',
        color: 'blue'
      }

      /*   生命周期   */
    };

    _this.handleRepeatName = function (data) {
      var formattedData = Object.assign({}, data);

      var children = formattedData.children;

      if (!children || !children.length) return formattedData;

      // 递归遍历函数
      var iteration = function iteration(iData) {
        iData.fName = iData.name + _this.index++;
        if (iData.children && iData.children.length) {
          iData.children.map(function (child) {
            iteration(child);
          });
        }
      };

      // 开始递归遍历节点数据
      iteration(formattedData);

      return formattedData;
    };

    _this.formattingData = function (data) {
      var formattedData = _defineProperty({
        name: data.name,
        flag: data.flag,
        fName: data.fName
      }, 'child_' + data.fName, { // 根节点属性
        father: null,
        name: data.name,
        checked: _this.state['child_' + data.fName] && _this.state['child_' + data.fName].checked || false,
        isFolding: _this.state['child_' + data.fName] && _this.state['child_' + data.fName].isFolding || true,
        children: data.children && data.children.map(function (child) {
          return 'child_' + child.fName;
        })
      });

      var children = data.children,
          name = data.name,
          fName = data.fName;

      if (!children || !children.length) return _this.setState(formattedData);

      // 递归遍历函数
      var iteration = function iteration(iData, iName) {

        if (iData.children && iData.children.length) {

          var _isFolding = true;
          if (_this.state_clone['child_' + iData.fName]) {
            _isFolding = _this.state_clone['child_' + iData.fName] ? _this.state_clone['child_' + iData.fName].isFolding ? true : false : true;
          } else {
            _isFolding = _this.state['child_' + iData.fName] ? _this.state['child_' + iData.fName].isFolding ? true : false : true;
          }

          formattedData['child_' + iData.fName] = {
            father: 'child_' + iName,
            name: iData.name,
            checked: _this.state['child_' + iData.fName] && _this.state['child_' + iData.fName].checked || false,
            isFolding: _isFolding,

            children: iData.children.map(function (child) {
              iteration(child, iData.fName);
              return 'child_' + child.fName;
            })
          };
        } else {
          var _isFolding2 = true;
          if (_this.state_clone['child_' + iData.fName]) {
            _isFolding2 = _this.state_clone['child_' + iData.fName] ? _this.state_clone['child_' + iData.fName].isFolding ? true : false : true;
          } else {
            _isFolding2 = _this.state['child_' + iData.fName] ? _this.state['child_' + iData.fName].isFolding ? true : false : true;
          }

          formattedData['child_' + iData.fName] = {
            father: 'child_' + iName,
            name: iData.name,
            checked: _this.state['child_' + iData.fName] && _this.state['child_' + iData.fName].checked || false,
            isFolding: _isFolding2,

            children: null
          };
        }
      };

      // 开始递归遍历节点数据
      children.map(function (child) {
        iteration(child, fName);
      });
      // 保存克隆数据
      _this.state_clone = formattedData;
      _this.setState(formattedData);
    };

    _this.getRealActiveItem = function (nodeData) {
      var father = void 0,
          children = void 0;

      if (nodeData.father && _this.state[nodeData.father]) {
        father = _this.state[nodeData.father].name;
        nodeData = Object.assign({}, nodeData, {
          father: father
        });
      }

      if (nodeData.children && nodeData.children.length) {
        nodeData = Object.assign({}, nodeData, {
          children: nodeData.children.map(function (child) {
            return _this.state[child].name;
          })
        });
      }

      return nodeData;
    };

    _this.getChecked = function () {
      var getChecked = _this.props.getChecked;

      if (typeof getChecked !== 'function') return;
      var checkedArray = [];

      Object.keys(_this.state).map(function (key) {
        if (key.indexOf('child_') == 0) {
          if (_this.state[key].checked) {
            checkedArray.push(_this.getRealActiveItem(_this.state[key]));
          }
        }
      });

      getChecked(_this.state.name, checkedArray);
    };

    _this.setCheckedSingle = function (name, status) {
      var getChecked = _this.props.getChecked;

      var temp = {};
      var children = Object.keys(_this.state).map(function (key) {
        if (key === 'child_' + name) {
          temp[key] = Object.assign({}, _this.state[key], {
            checked: status
          });
        } else if (key.indexOf('child_') === 0 && _this.state[key].checked) {
          temp[key] = Object.assign({}, _this.state[key], {
            checked: false
          });
        }
      });

      _this.setState(temp, function () {

        if (typeof getChecked !== 'function') return;
        _this.getChecked();
      });
    };

    _this.setChecked = function (name, status) {
      var childName = 'child_' + name;
      var state = _this.state;
      var child = _this.state[childName];
      // 缓存一次更新
      var temp = {};

      /* ------------------- 根据节点所处的位置同时更新父节点 ------------------- */

      // 更新父节点
      var setFatherChecked = function setFatherChecked(node, status) {
        temp[node] = Object.assign({}, state[node], { checked: status });

        // 选中
        if (status) {

          var _father = state[node].father;
          if (_father && state[_father]) {
            var _children = state[_father].children;

            var bb = _children && _children.length && _children.every(function (_child) {
              if (_child == node) return status;
              return state[_child].checked;
            });

            // 孩子全部选中
            if (bb) {
              setFatherChecked(_father, true);
            }
          }

          // 取消选中
        } else {

          var _father2 = state[node].father;
          if (_father2 && state[_father2]) {
            var _children2 = state[_father2].children;

            var _bb = _children2 && _children2.length && _children2.every(function (_child) {
              return state[_child].checked;
            });

            // 孩子全部选中
            if (_bb) {
              setFatherChecked(_father2, false);
            }
          }
        }
      };

      /* ------------------- 根据节点所处的位置同时更新子节点 ------------------- */
      var setChildrenChecked = function setChildrenChecked(node, status) {
        var children = state[node].children;
        if (!children || !children.length) return;

        // 迭代逻辑
        var _setChecked = function _setChecked(_node, status) {
          temp[_node] = Object.assign({}, state[_node], { checked: status, isFolding: false });

          var _children = state[_node].children;
          if (!_children || !_children.length) return;

          _children.map(function (_child) {
            _setChecked(_child, status);
          });
        };

        // 开始迭代
        children.map(function (_child) {
          _setChecked(_child, status);
        });
      };

      // 开始执行节点父级和子级 checked 状态更改
      setFatherChecked(childName, status);
      setChildrenChecked(childName, status);

      _this.setState(temp, function () {
        _this.getChecked();
      });
    };

    _this.setFolding = function (name, status) {
      var isFolding = _this.state['child_' + name].isFolding;


      var temp = Object.assign({}, _this.state['child_' + name], { isFolding: !isFolding });
      _this.setState(_defineProperty({}, 'child_' + name, temp));
      // 更新克隆数据
      _this.state_clone['child_' + name].isFolding = !isFolding;
    };

    _this.toggleChecked = function (e, _ref) {
      var checked = _ref.checked;

      _this.setChecked(_this.state.fName, checked);
    };

    _this.toggleFolding = function () {
      _this.setState({
        isFolding: !_this.state.isFolding
      });
    };

    _this.setActiveItem = function (item, flag) {
      var setActiveItem = _this.props.setActiveItem;

      setActiveItem(item, flag, _this.state.name);
    };

    _this.checkboxContent = function (checkable, checked, singleChecked) {
      if (checkable) {
        if (singleChecked) {
          return null;
        }
        return _react2.default.createElement(
          'div',
          { style: { display: 'table-cell', paddingRight: '0.5rem' } },
          _react2.default.createElement(_semanticUiReact.Checkbox, { onChange: _this.toggleChecked, checked: checked })
        );
      }

      return null;
    };

    _this.generateItemTree = function (nodeData, isFolding) {
      var children = nodeData.children;
      var _this$props = _this.props,
          checkable = _this$props.checkable,
          singleChecked = _this$props.singleChecked,
          baseIcon = _this$props.baseIcon,
          baseColor = _this$props.baseColor;

      if (!children || !children.length) return null;

      // 传递选中状态
      var childrenInfo = {};

      Object.keys(_this.state).map(function (key) {
        if (key.indexOf('child_') == 0) {
          childrenInfo[key] = _this.state[key];
        }
      });

      var listStyle = isFolding ? 'none' : 'block';
      return _react2.default.createElement(
        _semanticUiReact.List.List,
        { className: 'List-List', style: { display: listStyle } },
        children.map(function (child, index) {
          return _react2.default.createElement(_ListItem2.default, {
            key: child.name + index + child.fName,
            nodeData: child,
            baseIcon: baseIcon,
            baseColor: baseColor,
            childrenInfo: childrenInfo,
            getChecked: _this.getChecked,
            setActiveItem: _this.setActiveItem,
            setChecked: _this.setChecked,
            setCheckedSingle: _this.setCheckedSingle,
            singleChecked: singleChecked,
            setFolding: _this.setFolding,
            checked: _this.state['child_' + child.fName].checked,
            checkable: checkable
          });
        })
      );
    };

    _this.state = {
      name: null, // 节点名，显示文字
      isFolding: true, // 是否需要折叠显示
      checkable: false, // 节点是否支持选中状态
      checked: false, //节点是否被选中
      flag: 'base',

      /*   会根据子节点个数创建多个child_xxx属性   */
      child_name: { // 这个根节点下的所有层级的子节点
        father: 'name', // 本级节点的父级节点名
        checked: false, // 选中状态
        isFolding: true, // 折叠状态
        children: ['child1', 'child2', 'child3'] // 本级节点的包含的所有子节点
      }
    };
    return _this;
  }

  /*   克隆一份最新的状态数据(用于处理state未及时更新的情况)   */
  // 子节点索引标识，用于处理子节点重名的情况


  _createClass(RootListItem, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.index = 0;
      this.formattingData(this.handleRepeatName(nextProps.data));
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.formattingData(this.handleRepeatName(this.props.data));
    }

    /**
     * [handleRepeatName 处理每个根节点层的数据项名重复]
     * @param  {Object} data [根节点层数据]
     */


    /**
     * [formattedData 格式化接收到的资源树数据]
     * @param data {Object} [根组件的数据]
     */


    /**
     * [getRealActiveItem 获取节点真实数据-原始数据为了防止重名做了去重处理]
     * @param  {Object} nodeData [节点数据]
     */


    /**
     * [getChecked 获取所有选中状态的节点]
     */


    /**
     * [setCheckedSingle 单选条件下设置节点选中状态]
     * @type {[type]}
     */


    /**
     * [setChecked 多选条件下设置节点选中状态]
     * @param name {String} [触发选中的节点名]
     * @param status {Boolean} [需要更改的选中状态]
     */


    // 切换子组件折叠显示


    // 手动触发


    // 切换折叠显示


    // 得到激活节点的数据


    /* ------------------- DOM构造 ------------------- */

    // checkbox


    // 创建子级资源树

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          checkable = _props.checkable,
          rightClickMenu = _props.rightClickMenu,
          singleChecked = _props.singleChecked,
          baseIcon = _props.baseIcon,
          baseColor = _props.baseColor;
      var flagMap = this.flagMap;
      var checked = this.state['child_' + this.state.fName].checked;
      var isFolding = this.state.isFolding;
      var flag = data.flag;


      var listIconName = void 0; // icon 图标名
      var listIconColor = void 0; // icon 颜色

      if (baseIcon && (flag === 'base' || !flag)) {
        listIconName = baseIcon;
      } else {
        listIconName = flag ? flagMap[flag].icon : flagMap['base'].icon;
        listIconName = listIconName === flagMap['base'].icon && !isFolding ? flagMap['base_toggle'].icon : listIconName;
      }

      if (baseColor && (flag === 'base' || !flag)) {
        listIconColor = baseColor;
      } else {
        listIconColor = flag ? flagMap[flag].color : flagMap['base'].color;
      }
      var listHeaderClass = isFolding || flag != 'base' ? 'List-Header' : 'List-Header List-Header-Active';

      return _react2.default.createElement(
        _semanticUiReact.List.Item,
        null,
        this.checkboxContent(checkable, checked, singleChecked),
        _react2.default.createElement(_semanticUiReact.List.Icon, {
          name: listIconName,
          onClick: function onClick() {
            _this2.toggleFolding();
            _this2.setActiveItem(_this2.getRealActiveItem(_this2.state['child_' + _this2.state.fName]), data.flag);
          },
          className: 'List-Icon',
          color: listIconColor
        }),
        _react2.default.createElement(
          _semanticUiReact.List.Content,
          null,
          _react2.default.createElement(
            _semanticUiReact.List.Header,
            {
              onClick: function onClick() {
                _this2.toggleFolding();
                _this2.setActiveItem(_this2.getRealActiveItem(_this2.state['child_' + _this2.state.fName]), data.flag);
              },
              className: listHeaderClass
            },
            _react2.default.createElement(
              'div',
              {
                className: 'list-header-text',
                'data-rightClickMenu': rightClickMenu ? true : false,
                title: data.name
              },
              data.name
            )
          ),
          this.generateItemTree(data, isFolding)
        )
      );
    }
  }]);

  return RootListItem;
}(_react.Component);
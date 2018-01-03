'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _semanticUiReact = require('semantic-ui-react');

var _RootListItem = require('./components/RootListItem');

var _ListItem = require('./components/ListItem');

require('./style/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ************************* TreeView ************************* */
var TreeView = function (_Component) {
  _inherits(TreeView, _Component);

  function TreeView(props) {
    _classCallCheck(this, TreeView);

    var _this = _possibleConstructorReturn(this, (TreeView.__proto__ || Object.getPrototypeOf(TreeView)).call(this, props));

    _this.handleItemClick = function (e, _ref) {
      var name = _ref.name;
      return _this.setState({ activeItem: name });
    };

    _this.setChecked = function () {};

    _this.setActiveItem = function (item, flag, root) {
      var setActiveItem = _this.props.setActiveItem;


      if (typeof setActiveItem === 'function') {
        setActiveItem(item, flag, root);
      }
    };

    _this.state = {
      activeItem: null, // 目前点击时选中的节点
      checkable: false, // 节点是否支持选中
      rightClickMenu: false // 是否支持右键菜单
    };
    return _this;
  }

  // 点击选中节点


  // 设置节点选中状态


  // 处理资源树的点击


  _createClass(TreeView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var activeItem = this.state.activeItem;
      var _props = this.props,
          checkable = _props.checkable,
          treeData = _props.treeData,
          getChecked = _props.getChecked,
          singleChecked = _props.singleChecked,
          baseIcon = _props.baseIcon,
          baseColor = _props.baseColor;


      return _react2.default.createElement(
        _semanticUiReact.List,
        null,
        treeData.map(function (data, index) {
          return _react2.default.createElement(_RootListItem.RootListItem, {
            key: data.name + index,
            data: data,
            baseIcon: baseIcon,
            baseColor: baseColor,
            singleChecked: singleChecked,
            setActiveItem: _this2.setActiveItem,
            getChecked: getChecked,
            checkable: checkable || _this2.state.checkable
          });
        })
      );
    }
  }]);

  return TreeView;
}(_react.Component);

TreeView.propTypes = {
  treeData: _propTypes.PropTypes.array.isRequired, // 见顶部数据格式 - 必要参数
  baseIcon: _propTypes.PropTypes.string, // base元素自定义图标名 - 参照semantic - 非必要参数
  baseColor: _propTypes.PropTypes.string, // base元素自定义图标颜色 - 非必要参数
  checkable: _propTypes.PropTypes.bool, // 资源树是否支持状态选中 - 非必要参数
  singleChecked: _propTypes.PropTypes.bool, // 使用单选状态 - 默认是多选状态 - 非必要参数

  /*   在回调函数里可以取得资源树返回的数据，比如切换选中状态时，
       我们传入的getChecked函数就会被调用并携带上所有被选中元素的数组   */
  getChecked: _propTypes.PropTypes.func, //  获取所有选中元素的函数 - [回调函数] - 非必要参数
  setActiveItem: _propTypes.PropTypes.func // 设置当前激活项 - [回调函数] - 非必要参数
};

SourceTree.defaultProps = {
  checkable: false, // 默认不支持选中功能
  singleChecked: false // 选中状态下默认是单选
};

exports.default = TreeView;
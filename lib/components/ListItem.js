'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ------------------- 资源树单个层级节点元素元素 ------------------- */
var ListItem = exports.ListItem = function (_Component) {
  _inherits(ListItem, _Component);

  function ListItem(props) {
    _classCallCheck(this, ListItem);

    var _this = _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));

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

    _this.toggleChecked = function (e, _ref) {
      var checked = _ref.checked;
      var _this$props = _this.props,
          setChecked = _this$props.setChecked,
          getChecked = _this$props.getChecked,
          setCheckedSingle = _this$props.setCheckedSingle,
          singleChecked = _this$props.singleChecked;
      var _this$state = _this.state,
          name = _this$state.name,
          fName = _this$state.fName;

      singleChecked ? setCheckedSingle(fName, checked) : setChecked(fName, checked);
    };

    _this.toggleFolding = function () {
      var setFolding = _this.props.setFolding;
      var _this$state2 = _this.state,
          name = _this$state2.name,
          fName = _this$state2.fName;

      setFolding(fName);

      _this.setActiveItem();
    };

    _this.setActiveItem = function () {
      var _this$props2 = _this.props,
          setActiveItem = _this$props2.setActiveItem,
          childrenInfo = _this$props2.childrenInfo;
      var _this$state3 = _this.state,
          name = _this$state3.name,
          fName = _this$state3.fName,
          flag = _this$state3.flag;

      if (typeof setActiveItem === 'function') {
        setActiveItem(_this.getRealActiveItem(childrenInfo['child_' + fName]), flag);
      }
    };

    _this.getRealActiveItem = function (nodeData) {
      var childrenInfo = _this.props.childrenInfo;

      var father = void 0,
          children = void 0;

      if (nodeData.father && childrenInfo[nodeData.father]) {
        father = childrenInfo[nodeData.father].name;
        nodeData = Object.assign({}, nodeData, {
          father: father
        });
      }

      if (nodeData.children && nodeData.children.length) {
        nodeData = Object.assign({}, nodeData, {
          children: nodeData.children.map(function (child) {
            return childrenInfo[child].name;
          })
        });
      }

      return nodeData;
    };

    _this.checkboxContent = function () {
      var _this$props3 = _this.props,
          nodeData = _this$props3.nodeData,
          childrenInfo = _this$props3.childrenInfo,
          checkable = _this$props3.checkable,
          singleChecked = _this$props3.singleChecked;
      var name = nodeData.name,
          fName = nodeData.fName,
          flag = nodeData.flag;


      if (checkable) {
        if (singleChecked && (flag === 'base' || !flag)) {
          return null;
        }
        var checked = childrenInfo['child_' + fName].checked || false;

        return _react2.default.createElement(
          'div',
          { style: { display: 'table-cell', paddingRight: '0.5rem' } },
          _react2.default.createElement(_semanticUiReact.Checkbox, { onChange: _this.toggleChecked, checked: checked })
        );
      }
      return null;
    };

    _this.listContent = function (isFolding) {
      var _this$props4 = _this.props,
          nodeData = _this$props4.nodeData,
          setChecked = _this$props4.setChecked,
          childrenInfo = _this$props4.childrenInfo,
          checkable = _this$props4.checkable,
          setFolding = _this$props4.setFolding,
          setActiveItem = _this$props4.setActiveItem,
          getChecked = _this$props4.getChecked,
          singleChecked = _this$props4.singleChecked,
          setCheckedSingle = _this$props4.setCheckedSingle,
          baseIcon = _this$props4.baseIcon,
          baseColor = _this$props4.baseColor;
      var children = nodeData.children,
          name = nodeData.name,
          fName = nodeData.fName;


      if (children && children.length) {
        var listStyle = isFolding ? 'none' : 'block';
        return _react2.default.createElement(
          _semanticUiReact.List.List,
          { className: 'List-List', style: { display: listStyle } },
          children.map(function (child, index) {
            return _react2.default.createElement(ListItem, {
              key: child.name + index + child.fName,
              baseIcon: baseIcon,
              baseColor: baseColor,
              nodeData: child,
              childrenInfo: childrenInfo,
              setChecked: setChecked,
              setActiveItem: setActiveItem,
              checkable: checkable,
              getChecked: getChecked,
              setCheckedSingle: setCheckedSingle,
              singleChecked: singleChecked,
              setFolding: setFolding,
              checked: childrenInfo['child_' + child.fName]
            });
          })
        );
      }
      return null;
    };

    _this.state = {
      name: null
    };
    return _this;
  }

  _createClass(ListItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var nodeData = this.props.nodeData;

      this.setState({
        name: nodeData.name,
        flag: nodeData.flag || null,
        fName: nodeData.fName
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nodeData = this.props.nodeData;


      this.setState({
        name: nodeData.name,
        flag: nodeData.flag || null,
        fName: nodeData.fName
      });
    }

    /*   页面事件和用户操作   */

    /**
     * [toggleChecked 切换选中状态]
     * @param  {Object} e       [dom事件对象]
     * @param  {Bool}   checked [是否被选中]
     */


    /**
     * [toggleFolding 切换折叠状态]
     */


    /**
     * [setActiveItem 点击某个资源树节点触发的事件]
     */


    /**
     * [getRealActiveItem 获取节点真实数据-原始数据为了防止重名做了去重处理]
     * @param  {Object} nodeData [节点数据]
     */


    /*   DOM元素构造   */

    /**
     * [checkboxContent 选中状态框]
     */


    /**
     * [listContent 当前层级元素的子元素]
     * @param  {Boolean} isFolding [当前层级是否被折叠]
     */

  }, {
    key: 'render',


    /* ------------------- render ------------------- */

    value: function render() {
      var _props = this.props,
          nodeData = _props.nodeData,
          rightClickMenu = _props.rightClickMenu,
          childrenInfo = _props.childrenInfo,
          baseIcon = _props.baseIcon,
          baseColor = _props.baseColor;
      var flagMap = this.flagMap;
      var isFolding = childrenInfo['child_' + nodeData.fName].isFolding;
      var flag = nodeData.flag;


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
        this.checkboxContent(),
        _react2.default.createElement(_semanticUiReact.List.Icon, {
          name: listIconName,
          onClick: this.toggleFolding,
          className: 'List-Icon',
          color: listIconColor
        }),
        _react2.default.createElement(
          _semanticUiReact.List.Content,
          null,
          _react2.default.createElement(
            _semanticUiReact.List.Header,
            {
              onClick: this.toggleFolding,
              className: listHeaderClass
            },
            _react2.default.createElement(
              'div',
              {
                className: 'list-header-text',
                'data-rightClickMenu': rightClickMenu ? true : false,
                title: nodeData.name
              },
              nodeData.name
            )
          ),
          this.listContent(isFolding)
        )
      );
    }
  }]);

  return ListItem;
}(_react.Component);

;
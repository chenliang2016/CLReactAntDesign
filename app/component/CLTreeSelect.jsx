import React from 'react';
import { TreeSelect } from 'antd';
import {Ajax} from '../common/Common';
const TreeNode = TreeSelect.TreeNode;

function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
        curKey.indexOf(item.key) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
  const loop = (data) => {
    data.forEach((item) => {
      if (item.children) {
        loop(item.children);
      } else {
        if (curKey.indexOf(item.key) === 0) {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  setLeaf(treeData, curKey, level);
}

class CLTreeSelect extends React.Component {

  constructor(props) {
  	super(props);
    var value = ''
    var value = props.value;

    if (value!=undefined) {
        value = [value];
    }
  	this.state = {
  		treeData: [],
      value: value,
  	};
  };

  componentWillReceiveProps(nextProps) {
      this.setState(nextProps);
  };

  componentDidMount() {
  	var self = this;
  	var url = self.props.treeUrl;
  	this.setState({
  		treeData: [
  		{ label: '根目录',value:-1, key: -1 }
  		],
    });
  };

  generateTreeNodes = (treeLoadData) => {
  	var titleKey = this.props.treeNode.title;
  	var keyKey = this.props.treeNode.key; 
  	const arr = [];
  	var count = treeLoadData.length;
  	for (let i = 0; i < count; i++) {
  		var item = treeLoadData[i];
  		var name = item[titleKey];
  		var key  = item[keyKey];
  		// arr.push({ name: name, key: key });
      arr.push({ label: name, value: key,key: key });
  	}
  	return arr;
  };

  onChange = (value) => {
    this.setState({ value });
  };

  treeSelect = (info,node) => {
     var treeNodeSelect = this.props.onTreeNodeSelect;
     var treeSelectFormTitle = this.props.treeSelectFormTitle;
     var treeSelectFormValue = this.props.treeSelectFormValue;
     // if (treeSelectFormTitle == undefined) {
     //     treeNodeSelect(info);
     // }else{
         treeNodeSelect(info,node,treeSelectFormTitle,treeSelectFormValue);
     // }
  };

  onLoadData = (treeNode)=> {
  	return new Promise((resolve) => {
  		var params = {pid:treeNode.props.eventKey};
  		Ajax.get(this.props.treeUrl, params).then((d) => {
  			const treeData = [...this.state.treeData];
  			getNewTreeData(treeData, treeNode.props.eventKey, this.generateTreeNodes(d), 2);
  			this.setState({ treeData });
  			resolve();  
  		});
  	});
  };

  render() {
    var treeData = this.state.treeData;

    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      placeholder: '请选择',
      onSelect:this.treeSelect,
      loadData: this.onLoadData
    };

    return (
      <TreeSelect {...tProps} />
    );
  }
}

export default CLTreeSelect;
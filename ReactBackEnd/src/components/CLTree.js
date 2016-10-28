import React from 'react';
import {Tree} from 'antd';
const TreeNode = Tree.TreeNode;
import fetchUtil from '../libs/fetchUtil';

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

class CLTree extends React.Component {

    static defaultProps = {
        rootKey: '-1',
    };

    constructor() {
        super();
        this.state = {
            treeData: []
        };
    };

    componentDidMount() {
        var self = this;
        const rootKey = self.props.rootKey;
        this.setState({
        treeData: [
          { name: '根目录', key: rootKey }
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
            arr.push({ name: name, key: key });
        }
        return arr;
    };

    onLoadData = (treeNode)=> {
        return new Promise((resolve) => {
            const treeUrl = `${this.props.treeUrl}?pid=${treeNode.props.eventKey}`;
            fetchUtil.get(treeUrl)
                .then((d)=>{
                    const treeData = [...this.state.treeData];
                    getNewTreeData(treeData, treeNode.props.eventKey, this.generateTreeNodes(d), 1);
                    this.setState({ treeData });
                    resolve();
                },e =>{

                });
        });
    };

    render() {
        const loop = data => data.map((item) => {
          if (item.children) {
            return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
          }
          return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} />;
        });
        const treeNodes = loop(this.state.treeData);
        return (
          <Tree onSelect={this.props.onSelect} loadData={this.onLoadData}>
                 {treeNodes}
          </Tree>
        );
    }
}

export default CLTree;

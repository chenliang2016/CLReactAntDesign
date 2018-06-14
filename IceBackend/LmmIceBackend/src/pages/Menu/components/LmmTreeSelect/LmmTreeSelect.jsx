import React, { Component } from 'react';
import { TreeSelect } from "@icedesign/base";

const TreeNode = TreeSelect.Node;

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_ALLMENUS = gql`
    query{
      allmenu{
        menuId,
        name,
        pmenuId
      }
  }
`

class LmmTreeSelect extends React.Component {

    constructor(props) {
        super(props);

        this.treeNode = {
            title:'name',
            key:'menuId',
            pkey:'pmenuId',
        }

        this.state = {
            value:undefined,
        }
    }

    handleChange = (value, data) => {
        this.setState({value});
        this.props.handleChange(value);
    }

    loopTreeData = (data, pid) => {
        let result = [], temp;
        for (var i = 0; i < data.length; i++) {
            const treeData = data[i];
            const treeDataName = treeData[this.treeNode.title];
            const treeDataKey = ""+treeData[this.treeNode.key];
            const treeDataPkey = ""+treeData[this.treeNode.pkey];

            if (treeDataPkey === pid) {
                let obj = {label: treeDataName, value: treeDataKey, key: treeDataKey};
                temp = this.loopTreeData(data, treeDataKey);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                result.push(obj);
            }
        }

        return result;
    };

    render() {
        return (
            <Query
                query={GET_ALLMENUS}
            >
                {({ loading, error, data, refetch }) => {

                    let list = data.allmenu;
                    let treeData = [];
                    if (list != undefined){
                        treeData = this.loopTreeData(list,'-1');
                    }

                return (
                    <TreeSelect
                        value={this.state.value}
                        dataSource={treeData}
                        treeDefaultExpandAll
                        onChange={this.handleChange}
                        hasClear
                        autoWidth
                        style={{ width: 200 }}
                    >
                    </TreeSelect>
                )}}
        </Query>
    );
  }
}

export default LmmTreeSelect;
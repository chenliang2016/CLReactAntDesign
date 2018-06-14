import React, { Component } from 'react';
import { TreeSelect } from "@icedesign/base";

class LmmTreeSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value:undefined,
        }
    }

    handleChange = (value, data) => {
        this.setState({value});
        this.props.handleChange(value);
    }

    render() {
        return (
            <TreeSelect
                value={this.state.value}
                dataSource={this.props.treeData?this.props.treeData:[]}
                treeDefaultExpandAll
                onChange={this.handleChange}
                hasClear
                autoWidth
                style={{ width: 200 }}
            >
            </TreeSelect>
    );
  }
}

export default LmmTreeSelect;
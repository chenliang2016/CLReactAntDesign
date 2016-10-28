import React from 'react';
import {TreeSelect} from 'antd';
import fetchUtil from '../libs/fetchUtil';

class CLTreeSelect extends React.Component {

    static defaultProps = {
        rootKey: '-1',
    };

    constructor(props) {
        super(props);

        this.state = {
            treeData: [],
        };

        this.treeNode = props.treeNode;
        this.treeUrl = props.treeUrl;
    };

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    };

    componentDidMount() {
        const self = this;
        const rootKey = "" + self.props.rootKey;
        fetchUtil.get(this.treeUrl)
            .then((d)=>{
                const treeData = self.loopTreeData(d,rootKey);
                self.setState({
                    treeData: [{
                        label:"根",
                        value:rootKey,
                        key:rootKey,
                        children:treeData
                    }],
                });
            },e =>{

            });

    };

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

    treeSelect = (info, node) => {
        var treeNodeSelect = this.props.onTreeNodeSelect;
        var treeSelectFormTitle = this.props.treeSelectFormTitle;
        var treeSelectFormValue = this.props.treeSelectFormValue;
        treeNodeSelect(info, node, treeSelectFormTitle, treeSelectFormValue);
    };


    render() {
        var treeData = this.state.treeData;
        let value;
        if (this.props.value){
            value = ""+this.props.value;
        }

        const tProps = {
            treeData,
            value: value,
            placeholder: '请选择',
            onSelect: this.treeSelect,
        };

        return (
            <TreeSelect {...tProps} />
        );
    }
}

export default CLTreeSelect;

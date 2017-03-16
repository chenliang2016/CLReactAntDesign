import React from 'react';
import {Button, Input, Form, Modal,Tree,Table} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

import {getAllRoleMenu,configRoleMenu} from '../../actions/frameRoleAction'

class FrameRoleMenu extends React.Component{

    constructor(props) {
    	super(props);

        this.state = {
            defaultKeys:props.defaultKeys,
        };
        this.chooseRoleId = props.chooseRoleId;
        this.selectKeys=`${props.defaultKeys}`;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
        this.chooseRoleId = nextProps.chooseRoleId;
        this.selectKeys=`${nextProps.defaultKeys}`;
    }

    componentDidMount() {
        this.props.dispatch(getAllRoleMenu());
    }

    handleOk = ()=> {
        this.props.dispatch(configRoleMenu(this.chooseRoleId,this.selectKeys));
    };

    handleCancel = ()=> {
        this.props.onClose();
    };

    rowKey = (record)=>  {
        return record.menuId;
    };

    rowOnChange = (selectedRowKeys, selectedRows)=> {
        this.selectKeys = `${selectedRowKeys}`;
        this.setState({defaultKeys:selectedRowKeys})
    };


    render() {
        const columns = [{
          title: '菜单名称',
          dataIndex: 'name',
          key: 'name',
        }];

        var rowSelection = {
          selectedRowKeys:this.state.defaultKeys,
          onChange:this.rowOnChange,
        };

        return (
            <div>
                <Modal ref="modal" visible={this.props.visible} title={'配置权限'}
                onOk={this.handleOk} onCancel={this.handleCancel} footer={[< Button key = "back" type = "ghost" size = "large" onClick = {
                        this.handleCancel
                    } > 返 回 </Button>, <Button key="submit" type="primary" size="large" loading={this.props.menuformloading} onClick={this.handleOk}> 提 交 </Button >]}>
                    <Form horizontal>
					              <Table columns={columns} rowKey= {this.rowKey} rowSelection={rowSelection} dataSource={this.state.treeData} pagination={false} />,
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default FrameRoleMenu;

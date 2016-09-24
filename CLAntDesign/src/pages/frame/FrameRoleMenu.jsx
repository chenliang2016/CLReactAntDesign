import React from 'react';
import {Button, Input, Form, Modal,Tree,Table} from 'antd';
import {Ajax} from '../../libs/common';
const createForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

class FrameRoleMenu extends React.Component{
    static defaultProps = {
          visible: false,
          formData: {},
    };

    constructor(props) {
    	super(props);
    	this.originalTreeData = [];
        this.state = {
            loading: false,
            edit: false,
            treeData:[],
            formData:props.formData,
            defaultkey:[],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
        var self = this;

        var roleId = nextProps.formData.roleId;

        Ajax.get('/api/role/getRoleMenus', {roleId:roleId}).then((d) => {
          var defaultkeys = [];
          for(var i = 0 ;i < d.length; i ++){
            defaultkeys.push(d[i].menuId);
          }
          self.setState({
            defaultkey:defaultkeys
          })
        });
    }

    componentDidMount() {
        var self = this;
        var url = "/api/menu/allList";

        Ajax.get(url, {}).then((d) => {
        	self.originalTreeData = d;
            const treeData = [...this.state.treeData];
            d = self.loopTreeData(d,-1);
            self.setState({treeData:d});
        });
    }

    handleOk = () => {
        this.setState({loading: true});
        var self = this;
        Ajax.post('/api/role/configRoleMenu', this.state.formData).then((d) => {
            if (d.success) {
                self.setState({loading: false});
                self.props.onClose(d);
            } else {
                self.setState({loading: false});
            }
        });
    };

    handleCancel = () => {
        this.props.onClose();
    };

    loopTreeData = (data, pid) => {
        var result = [], temp;
        for (var i = 0; i < data.length; i++) {
            if (data[i].pmenuId == pid) {
                var obj = {name: data[i].name,"menuId": data[i].menuId,"key":data[i].menuId};
                temp = this.loopTreeData(data, data[i].menuId);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                result.push(obj);
            }
        }
        return result;
    };

    rowKey = (record) => {
        return record.menuId;
    };

    rowOnChange = (selectedRowKeys, selectedRows) => {
        this.state.formData.menus = `${selectedRowKeys}`;
        this.setState({
          defaultkey:selectedRowKeys
        })
    };

    rowOnSelect = (record, selected, selectedRows) => {
    };

    render() {
        const columns = [{
          title: '菜单名称',
          dataIndex: 'name',
          key: 'name',
        }];

        var rowSelection = {
          selectedRowKeys:this.state.defaultkey,
          onChange:this.rowOnChange,
          onSelect:this.rowOnSelect,
        };

        return (
            <div>
                <Modal ref="modal" visible={this.props.visible} title={'配置权限'}
                onOk={this.handleOk} onCancel={this.handleCancel} footer={[< Button key = "back" type = "ghost" size = "large" onClick = {
                        this.handleCancel
                    } > 返 回 </Button>, <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}> 提 交 </Button >]}>
                    <Form horizontal>
					              <Table columns={columns} rowKey= {this.rowKey} rowSelection={rowSelection} dataSource={this.state.treeData} pagination={false} />,
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default FrameRoleMenu;

import React from 'react';
import {Button, Input, Form, Modal,Tree,Table} from 'antd';
import {Ajax} from '../../libs/common';
const createForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

class FrameUserRole extends React.Component{
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

        var userId = nextProps.formData.userId;

        Ajax.get("/api/user/getUserRoles", {userId:userId}).then((d) => {
          var defaultKeys = [];
          for (var i = 0; i < d.length; i++) {
            var roleid = d[i].roleId;
            defaultKeys.push(roleid);
          };
          self.setState({
            defaultkey:defaultKeys
          })
        });
    }


    componentDidMount() {
        var self = this;
        var url = "/api/role/allList";

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

        Ajax.post('/api/user/configUserRole', this.state.formData).then((d) => {
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

    loopTreeData(data, pid){
	    var result = [], temp;
	    for (var i = 0; i < data.length; i++) {
	        if (data[i].proleId == pid) {
	            var obj = {name: data[i].name,"roleId": data[i].roleId,"key":data[i].roleId};
	            temp = this.loopTreeData(data, data[i].roleId);
	            if (temp.length > 0) {
	                obj.children = temp;
	            }
	            result.push(obj);
	        }
	    }
	    return result;
	  };

    rowKey = (record) => {
        return record.roleId;
    };

    rowOnChange = (selectedRowKeys, selectedRows) => {
        this.state.formData.roles = `${selectedRowKeys}`;
        console.log(this.state.formData.roles);
        this.setState({
          defaultkey:selectedRowKeys
        })
    };

    rowOnSelect = (record, selected, selectedRows) => {
        // console.log(selectedRows);
    };

    render() {
        const columns = [{
          title: '角色名称',
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
                onOk={this.handleOk} onCancel={this.handleCancel} footer={[<Button key = "back" type = "ghost" size = "large" onClick = {
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

export default FrameUserRole;

import React from 'react';
import {
    Table,
    Form,
    Input,
    Row,
    Col,
    Button,
    Modal
} from 'antd';
import {TableModel, Ajax} from '../../libs/common';
const confirm = Modal.confirm;
import CLContentCard from '../../components/CLContentCard';
import FrameUserRole from './FrameUserRole';
import CLModalForm from '../../components/CLModalForm';
import styles from "../style/pageStyle.less";

class Users extends React.Component {

    constructor() {
        super();

        var self = this;

        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: '100'
            }, {
                title: '登录名',
                dataIndex: 'loginName',
                key: 'loginName',
                width: '100'
            }, {
                title: '操作',
                key: '操作',
                render: function(text, record, index) {
                    return <div>
                        <a onClick={self.editHandle(record, index)}>修改</a>
                      <span className="ant-divider"></span>
                      <a onClick={self.deleteHandle(record, index)}>删除</a>
                      <span className="ant-divider"></span>
                      <a onClick={self.configRole(record, index)}>配置角色</a>
                    </div>;
                }
            }
        ];

        this.tableModel = new TableModel('/api/user/list', (model) => {
            self.setState({tableModel: model});
        });

        this.state = {
            tableModel: this.tableModel,
            formVisible: false,
            roleformVisible: false,
            formData: {},
            roleformData:{},
            edit: false
        };
    }

    componentDidMount() {
        this.tableModel.fetch();
    }

    deleteHandle = (record) => {
        const self = this;

        return function() {
            confirm({
                title: '提示',
                content: '确认删除？',
                onOk() {
                    Ajax.get('/api/user/delete', {userId: record.userId}).then(() => {
                        self.tableModel.fetch();
                    });
                },
                onCancel() {}
            });
        };
    };

    editHandle = (record, index) => {
        const self = this;
        return function() {
            self.setState({formVisible: true, edit: true, formData: record});
        };
    };

    configRole = (record, index) => {
        const self = this;
        return function() {
            self.setState({roleformVisible: true, roleformData: {userId:record.userId}});
        };
    };

    showForm = () => {
        this.setState({formVisible: true, formData: {}, edit: false});
    };

    formClose = (d) => {
        if (d) {
            this.tableModel.fetch();
        }
        this.setState({formVisible: false});
    };

    roleformClose = (d) => {
        this.setState({roleformVisible: false});
    };

    render() {
        const formItems = [
        {
            type:"Input",
            title:"用户名称",
            arrname:"name",
            require:true,
        },
        {
            type:"Input",
            title:"用户登录名",
            arrname:"loginName",
            require:true,
        },
        {
            type:"Input",
            title:"登录密码",
            arrname:"loginPasw",
            require:true,
        }
        ];

        return (
            <CLContentCard title="人员列表" icon="bars">
                <div>
                    <Button type="primary" className={styles.button} onClick={this.showForm}>新增用户</Button>
                </div>
                <Table dataSource={this.state.tableModel.data} columns={this.columns} size="middle" pagination={this.state.tableModel.pagination} rowKey={this.rowKey} loading={this.state.tableModel.loading} className="table" onChange={this.state.tableModel.tableChange}/>
                <CLModalForm visible={this.state.formVisible} onClose={this.formClose} formItems={formItems} edit={this.state.edit} formData={this.state.formData}
                            updateUrl='/api/user/update' addUrl='/api/user/add'/>
                <FrameUserRole visible={this.state.roleformVisible} onClose={this.roleformClose} formData={this.state.roleformData}/>
            </CLContentCard>
        );
    }
}

export default Users;

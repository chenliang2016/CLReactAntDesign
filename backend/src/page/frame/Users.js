import React from 'react';
import {
    Table,
    Form,
    Input,
    Button,
    Modal
} from 'antd';
const confirm = Modal.confirm;
import CLContentCard from '../../components/CLContentCard';
import FrameUserRole from './FrameUserRole';
import CLModalForm from '../../components/CLModalForm';
import styles from "../style/pageStyle.less";

import {getUserList,deleteUser,showUserRoleForm,hideUserRoleForm,getUserRole} from '../../actions/userAction';
import { connect } from 'react-redux'

import {formAdd,formHide,formEdit} from '../../actions/common/formAction';

@connect(
    state => ({
        loading: state.table.loading,
        userlist:state.user.userlist,
        total:state.user.total,
        formVisible:state.form.visible,
        formedit:state.form.formedit,
        formdata:state.form.formdata,
        userroleVisible:state.user.userroleVisible,
        roleformData:state.user.roleformData,
        userrolekeys:state.user.userrolekeys,
        chooseUserId:state.user.chooseUserId,
        treedata:state.user.treedata,
        roleformloading:state.user.roleformloading
    })
)
class Users extends React.Component {

    constructor() {
        super();

        var self = this;

        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                minWidth: '100'
            }, {
                title: '登录名',
                dataIndex: 'loginName',
                key: 'loginName',
                minWidth: '100'
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

        this.state = {
            formVisible:true,
            edit:false,
            formData:{}
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getUserList(1));
    }

    deleteHandle(record) {
        const { dispatch } = this.props
        return function() {
            confirm({
                title: '提示',
                content: '确认删除？',
                onOk() {
                    dispatch(deleteUser(record.userId));
                },
                onCancel() {}
            });
        };
    };

    editHandle(record, index){
        const { dispatch } = this.props
        return function() {
            dispatch(formEdit(record));
        };
    };

    configRole(record, index) {
        const { dispatch } = this.props;
        return function() {
            dispatch(showUserRoleForm(record.userId));
        };
    };

    showForm = ()=> {
        const { dispatch } = this.props;
        dispatch(formAdd())
    };

    formClose = (d) => {
        const { dispatch } = this.props;
        dispatch(formHide());
        dispatch(getUserList(1));
    };

    roleformClose = (d) => {
        const { dispatch } = this.props;
        dispatch(hideUserRoleForm());
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

        const pagination = {
            total: this.props.total,
            showTotal:total => `共 ${total} 项`,
            pageSize:10,
            onChange(current) {
                dispatch(getUserList(current));
            },
        };

        const tableProps = {
            columns:this.columns,
            rowKey:record => record.userId,
            dataSource:this.props.userlist,
            pagination:pagination,
            loading:this.props.loading,
            size:"middle"
        };

        return (
            <CLContentCard title="人员列表" icon="bars">
                <div className={styles.operateDiv}>
                    <Button type="primary"  onClick={this.showForm}>新增用户</Button>
                </div>
                <Table {...tableProps}/>
                <CLModalForm  onClose={this.formClose} formItems={formItems}  visible={this.props.formVisible} edit={this.props.formedit}
                              formData={this.props.formdata}
                            updateUrl='/api/user/update' addUrl='/api/user/add' />
                <FrameUserRole visible={this.props.userroleVisible}
                               dispatch={this.props.dispatch}
                               treedata={this.props.treedata}
                               onClose={this.roleformClose}
                               defaultKeys={this.props.userrolekeys}
                               formData={this.props.roleformData}
                               roleformloading={this.props.roleformloading}
                               chooseUserId={this.props.chooseUserId}
                />
            </CLContentCard>
        );
    }
}

export default Users;

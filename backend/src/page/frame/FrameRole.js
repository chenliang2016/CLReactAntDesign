import React from 'react';
import {
    Table,
    Form,
    Input,
    Row,
    Col,
    Button,
    Modal,
    message
} from 'antd';
const confirm = Modal.confirm;
import {connect} from 'react-redux'

import CLContentCard from '../../components/CLContentCard';
import ListWithTreeLayout from '../../layouts/BaseLayout/ListWithTreeLayout'
import CLModalForm from '../../components/CLModalForm';
import FrameRoleMenu from './FrameRoleMenu';
import styles from "../style/pageStyle.less";

import {getRoleList, deleteRole, showRoleMenuForm, hideRoleMenuForm} from '../../actions/frameRoleAction'
import {formAdd, formEdit, formHide} from '../../actions/common/formAction'

@connect(
    state => ({
        loading: state.table.loading,
        dataSource: state.role.rolelist,
        total: state.role.total,
        formVisible: state.form.visible,
        formedit: state.form.formedit,
        formdata: state.form.formdata,
        roleMenuVisible: state.role.roleMenuVisible,
        treedata: state.role.treedata,
        roleMenuKeys: state.role.roleMenuKeys,
        chooseRoleId: state.role.chooseRoleId,
        menuformloading: state.role.menuformloading,
    })
)
class CLFrameRole extends React.Component {

    constructor() {
        super();

        var self = this;

        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '操作',
                key: '操作',
                render: function (text, record, index) {
                    return <div className="table-tools">
                        <a onClick={self.editHandle(record, index)}>修改</a>
                        <span className="ant-divider"></span>
                        <a onClick={self.deleteHandle(record, index)}>删除</a>
                        <span className="ant-divider"></span>
                        <a onClick={self.configMenu(record, index)}>配置菜单</a>
                    </div>;
                }
            }
        ];

        this.treeNode = {
            title: 'name',
            key: 'roleId'
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getRoleList(1));
    }

    deleteHandle(record) {
        const self = this;
        const {dispatch} = this.props;
        return function () {
            confirm({
                title: '提示',
                content: '确认删除？',
                onOk() {
                    dispatch(deleteRole(record.roleId));
                },
                onCancel() {
                }
            });
        };
    };

    editHandle(record, index) {
        const {dispatch} = this.props;
        return function () {
            dispatch(formEdit(record));
        };
    };

    configMenu = (record, index)=> {
        const {dispatch} = this.props;
        return function () {
            dispatch(showRoleMenuForm(record.roleId));
        };
    };

    frameRoleMenuClose = (d)=> {
        const {dispatch} = this.props;
        dispatch(hideRoleMenuForm());
    };

    showForm = ()=> {
        const {dispatch} = this.props;
        dispatch(formAdd());
    };

    formClose = (d)=> {
        const {dispatch} = this.props;
        dispatch(formHide());
        dispatch(getRoleList(1));
    };

    treeNodeOnSelect = (info)=> {
        const {dispatch} = this.props;
        dispatch(getRoleList(1, info[0]));
    };

    render() {

        const formItems = [
            {
                type: "TreeSelect",
                title: "父节点",
                arrname: "proleId",
                treeUrl: "/api/role/allList",
                treeSelectFormValue: "proleId",
                treeNode: {
                    title: 'name',
                    key: 'roleId',
                    pkey: 'proleId'
                }
            },
            {
                type: "Input",
                title: "角色名称",
                arrname: "name"
            }
        ];

        const {dispatch} = this.props;

        const pagination = {
            total: this.props.total,
            showTotal: total => `共 ${total} 项`,
            pageSize: 10,
            onChange(current) {
                dispatch(getMenuList(current, this.pmenuId));
            },
        };

        const tableProps = {
            columns: this.columns,
            rowKey: record => record.roleId,
            dataSource: this.props.dataSource,
            pagination: pagination,
            loading: this.props.loading,
            size: "middle"
        };

        const formProps = {
            visible: this.props.formVisible,
            edit: this.props.formedit,
            formData: this.props.formdata,
            formItems: formItems,
            onClose: this.formClose,
            updateUrl: '/api/role/update',
            addUrl: '/api/role/add'
        };

        const listWithTreeProps = {
            treeTitle: "选择角色",
            treeTitleDes: "选择角色查询子角色",
            treeUrl: "/api/role/listByPid",
            treeNode: this.treeNode,
            onSelect: this.treeNodeOnSelect
        };

        return (
            <ListWithTreeLayout {...listWithTreeProps}>
                <CLContentCard title="角色管理" icon="bars">
                    <div className={styles.operateDiv}>
                        <Button type="primary" className={styles.button} onClick={this.showForm}>新增角色</Button>
                    </div>
                    <Table {...tableProps}/>
                    <CLModalForm {...formProps}/>
                    <FrameRoleMenu visible={this.props.roleMenuVisible}
                                   dispatch={this.props.dispatch}
                                   treeData={this.props.treedata}
                                   onClose={this.frameRoleMenuClose}
                                   defaultKeys={this.props.roleMenuKeys}
                                   formData={this.props.roleformData}
                                   menuformloading={this.props.menuformloading}
                                   chooseRoleId={this.props.chooseRoleId}
                    />
                </CLContentCard>
            </ListWithTreeLayout>
        );
    }
}

export default CLFrameRole;

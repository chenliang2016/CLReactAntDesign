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
import { connect } from 'react-redux'

import CLContentCard from '../../components/CLContentCard';
import CLModalForm from '../../components/CLModalForm';
import styles from "../style/pageStyle.less";

import {getMenuList,deleteMenu} from "../../actions/frameMenuAction";
import {formAdd,formEdit,formHide} from '../../actions/common/formAction';

import ListWithTreeLayout from '../../layouts/BaseLayout/ListWithTreeLayout'

@connect(
    state => ({
        loading: state.table.loading,
        menulist:state.menu.menulist,
        total:state.menu.total,
        formVisible:state.form.visible,
        formedit:state.form.formedit,
        formdata:state.form.formdata,
    })
)
class CLFrameMenu extends React.Component {

    constructor() {
        super();

        var self = this;

        this.columns = [
            {
                title: '菜单名',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '排序',
                dataIndex: 'orderNum',
                key: 'orderNum'
            },{
                title: '地址',
                dataIndex: 'tourl',
                key: 'tourl'
            },{
                title: '操作',
                key: '操作',
                render: function(text, record, index) {
                    return <div className="table-tools">
                        <a onClick={self.editHandle(record, index)}>修改</a>
                        <span className="ant-divider"></span>
                        <a onClick={self.deleteHandle(record, index)}>删除</a>
                    </div>;
                }
            }
        ];

        this.treeNode = {
            title: 'name',
            key: 'menuId'
        };

        this.pmenuId = -1;

        this.state = {
            tableModel: this.tableModel,
            formVisible: false,
            formData: {},
            edit: false,
            tableStateValue:null,
            treeData:[],
            selectItems:[]
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getMenuList(1));
    }

    deleteHandle = (record)=>{
        const self = this;
        const {dispatch} = this.props;
        return function() {
            confirm({
                title: '提示',
                content: '确认删除？',
                onOk() {
                    dispatch(deleteMenu(record.menuId));
                },
                onCancel() {}
            });
        };
    };

    editHandle =(record, index)=>{
        const {dispatch} = this.props;
        return function() {
            dispatch(formEdit(record));
        };
    };

    showForm =()=>{
        const {dispatch} = this.props;
        dispatch(formAdd());
    };

    formClose =(d)=> {
        const {dispatch} = this.props;
        dispatch(formHide());
        if (d) {
            dispatch(getMenuList(1));
        }
    };

    treeNodeOnSelect = (info)=>{
        this.pmenuId = info[0];
        const {dispatch} = this.props;
        dispatch(getMenuList(1,this.pmenuId));
    };

    render() {
        const formItems = [
        {
            type:"TreeSelect",
            title:"父菜单",
            arrname:"pmenuId",
            treeUrl:"/api/menu/allList",
            treeSelectFormValue:"pmenuId",
            treeNode:{
                title: 'name',
                key: 'menuId',
                pkey:'pmenuId'
            },
            require:true
        },
        {
            type:"Input",
            title:"菜单名称",
            arrname:"name",
            require:true
        },
        {
            type:"Input",
            title:"菜单key值",
            arrname:"menuKey",
            require:true
        },
        {
            type:"Input",
            title:"跳转url",
            arrname:"tourl",
            require:true
        },
        {
            type:"Input",
            title:"排序",
            arrname:"orderNum",
            require:true
        }
        ];

        const {dispatch} = this.props;

        const pagination = {
            total: this.props.total,
            showTotal:total => `共 ${total} 项`,
            pageSize:10,
            onChange(current) {
                dispatch(getMenuList(current,this.pmenuId));
            },
        };

        const tableProps = {
            columns:this.columns,
            rowKey:record => record.menuId,
            dataSource:this.props.menulist,
            pagination:pagination,
            loading:this.props.loading,
            size:"middle"
        };

        const formProps = {
            visible:this.props.formVisible,
            edit:this.props.formedit,
            formData:this.props.formdata,
            formItems:formItems,
            onClose:this.formClose,
            updateUrl:'/api/menu/update',
            addUrl:'/api/menu/add'
        };

        const listWithTreeProps = {
            treeTitle:"选择菜单",
            treeTitleDes:" 选择菜单查询子菜单项",
            treeUrl:"/api/menu/listByPid",
            treeNode:this.treeNode,
            onSelect:this.treeNodeOnSelect
        };

        return (
            <ListWithTreeLayout {...listWithTreeProps}>
                <CLContentCard title="菜单管理" icon="bars">
                    <div className={styles.operateDiv}>
                        <Button type="primary" className={styles.button} onClick={this.showForm}>新增菜单</Button>
                    </div>
                    <Table {...tableProps}/>
                    <CLModalForm {...formProps}/>
                </CLContentCard>
            </ListWithTreeLayout>
        );
    }
}

export default CLFrameMenu;

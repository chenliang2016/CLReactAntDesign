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
import {TableModel, Ajax} from '../../libs/common';
import CLContentCard from '../../components/CLContentCard';
import CLModalForm from '../../components/CLModalForm';
import ListWithTreeLayout from '../../layouts/BaseLayout/ListWithTreeLayout';
import styles from "../style/pageStyle.less";

import {getInfoCList,deleteInfoC} from '../../actions/infoCategoryAction';

import {formAdd,formHide,formEdit} from '../../actions/common/formAction';

@connect(
    state => ({
        loading: state.table.loading,
        dataSource: state.infoc.infoCList,
        total: state.infoc.total,
        formVisible: state.form.visible,
        formedit: state.form.formedit,
        formdata: state.form.formdata,
    })
)
class InfoCategory extends React.Component {

    constructor() {
        super();

        var self = this;

        this.columns = [
            {
                title: '类别名',
                dataIndex: 'categoryName',
                key: 'categoryName'
            }, {
                title: '排序',
                dataIndex: 'orderNum',
                key: 'orderNum'
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
            title: 'categoryName',
            key: 'categoryId'
        };
    }

    componentDidMount() {
        const {dispatch}  = this.props;
        dispatch(getInfoCList(1));
    }

    deleteHandle = (record)=>  {
        const {dispatch}  = this.props;
        return function() {
            confirm({
                title: '提示',
                content: '确认删除？',
                onOk() {
                    dispatch(deleteInfoC(record.categoryId));
                },
                onCancel() {}
            });
        };
    };

    editHandle = (record, index)=> {
        const {dispatch}  = this.props;
        return function() {
            dispatch(formEdit(record));
        };
    };

    showForm = ()=> {
        const {dispatch}  = this.props;
        dispatch(formAdd());
    };

    formClose = (d) => {
        const {dispatch}  = this.props;
        dispatch(formHide());
        dispatch(getInfoCList(1));
    };

    treeNodeOnSelect = (info) => {
        const {dispatch}  = this.props;
        dispatch(getInfoCList(1,info[0]));
    };

    render() {

        const formItems = [
            {
                type:"TreeSelect",
                title:"父类型",
                arrname:"pCategoryId",
                treeUrl:"/api/infoCategory/allList",
                treeSelectFormValue:"pCategoryId",
                treeNode:{
                    title: 'categoryName',
                    key: 'categoryId',
                    pkey:'pCategoryId'
                }
            },
            {
                type:"Input",
                title:"类型名称",
                arrname:"categoryName"
            },
            {
                type:"Input",
                title:"排序",
                arrname:"orderNum"
            }
        ];

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
            rowKey:record => record.categoryId,
            dataSource:this.props.dataSource,
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
            updateUrl:'/api/infoCategory/update',
            addUrl:'/api/infoCategory/add'
        };

        const listWithTreeProps = {
            treeTitle:"选择类型",
            treeTitleDes:" 选择类型查询子类型",
            treeUrl:"/api/infoCategory/listByPid",
            treeNode:this.treeNode,
            onSelect:this.treeNodeOnSelect
        };

        return (
            <ListWithTreeLayout {...listWithTreeProps}>
                <CLContentCard title="类型管理" icon="bars">
                    <div className={styles.operateDiv}>
                        <Button type="primary" className={styles.button} onClick={this.showForm}>新增类型</Button>
                    </div>
                    <Table {...tableProps}/>
                    <CLModalForm {...formProps}/>
                </CLContentCard>
            </ListWithTreeLayout>
        );
    }
}

export default InfoCategory;

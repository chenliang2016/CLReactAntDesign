import React from 'react';
import {TableModel, Ajax} from '../../libs/common';
import { Link } from 'react-router';
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
import {replace} from 'react-router-redux';
import styles from "../style/pageStyle.less";
import ListWithTreeLayout from '../../layouts/BaseLayout/ListWithTreeLayout';
import {getInfoList,deleteInfo,infoAdd,infoEdit,getInfoDetail} from '../../actions/infoAction'


@connect(
    state => ({
        loading: state.table.loading,
        dataSource: state.info.infoList,
        total: state.info.total,
        formVisible: state.form.visible,
        formedit: state.form.formedit,
        formdata: state.form.formdata,
    })
)
class InfoList extends React.Component{

    constructor(props) {
        super(props);

        var self = this;

        this.columns = [
            {
                title: '类别',
                dataIndex: 'categoryName',
                key: 'categoryName'
            }, {
                title: '标题',
                dataIndex: 'topic',
                key: 'topic'
            },{
                title: '操作',
                key: '操作',
                render: function(text, record, index) {
                    const tourl = 'info/infoAdd/'+record.infoId;
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
        this.categoryId = undefined;
    }

    componentDidMount() {
        const {dispatch}  = this.props;
        dispatch(getInfoList(1));
    }

    editHandle = (record) => {
        const {dispatch}  = this.props;
        return function() {
            dispatch(replace(`/info/infoAdd`));
            dispatch(getInfoDetail(record.infoId));
        };
    }

    deleteHandle = (record)=> {
        const {dispatch}  = this.props;
        return function() {
            confirm({
                title: '提示',
                content: '确认删除？',
                onOk() {
                    dispatch(deleteInfo(record.infoId));
                },
                onCancel() {}
            });
        };
    };

    infoAdd = ()=> {
        const {dispatch}  = this.props;
        dispatch(replace('/info/infoAdd'));
        dispatch(infoAdd());
    };

    treeNodeOnSelect = (info)=> {
        const {dispatch}  = this.props;
        this.categoryId = info[0];
        dispatch(getInfoList(1,this.categoryId));
    };

    render(){
        const {dispatch}  = this.props;


        const pagination = {
            total: this.props.total,
            showTotal:total => `共 ${total} 项`,
            pageSize:10,
            onChange(current) {
                dispatch(getInfoList(current,this.categoryId));
            },
        };

        const tableProps = {
            columns:this.columns,
            rowKey:record => record.infoId,
            dataSource:this.props.dataSource,
            pagination:pagination,
            loading:this.props.loading,
            size:"middle"
        };

        const listWithTreeProps = {
            treeTitle:"选择类型",
            treeTitleDes:" 选择类型查询相应类型下的文章",
            treeUrl:"/api/infoCategory/listByPid",
            treeNode:this.treeNode,
            onSelect:this.treeNodeOnSelect
        };

        return (
            <ListWithTreeLayout {...listWithTreeProps}>
                <CLContentCard title="类型管理" icon="bars">
                    <div className={styles.operateDiv}>
                        <Button type="primary" className={styles.button} onClick={this.infoAdd}>新增文章</Button>
                    </div>
                    <Table {...tableProps}/>
                </CLContentCard>
            </ListWithTreeLayout>
        );
    }
}

export default InfoList;
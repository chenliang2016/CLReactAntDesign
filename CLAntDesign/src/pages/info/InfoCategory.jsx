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

import {TableModel, Ajax} from '../../libs/common';
import CLContentCard from '../../components/CLContentCard';
import CLTree from '../../components/CLTree';
import CLModalForm from '../../components/CLModalForm';
import styles from "../style/pageStyle.less";

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

        this.tableModel = new TableModel('/api/infoCategory/list', (model) => {
            self.setState({tableModel: model});
        });

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
        this.tableModel.fetch();
        var self = this;
    }

    deleteHandle = (record) => {
        const self = this;

        return function() {
            confirm({
                title: '提示',
                content: '确认删除？',
                onOk() {
                    Ajax.get('/api/infoCategory/delete', {id: record.categoryId}).then(() => {
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

    showForm = () => {
        this.setState({formVisible: true, formData: {}, edit: false});
    };

    rowKey = (row) => {
        return row.categoryId;
    };

    formClose = (d) => {
        if (d) {
            this.tableModel.fetch();
        }
        this.setState({formVisible: false});
    };

    treeNodeOnSelect = (info) => {
        var params = {
            pCategoryId : info[0]
        }
        this.state.tableModel.fetch(params)
    };

    render() {

        const formItems = [
            {
                type:"TreeSelect",
                title:"父类型",
                arrname:"pCategoryId",
                treeUrl:"/api/infoCategory/listByPid",
                treeSelectFormValue:"pCategoryId",
                treeNode:{
                    title: 'categoryName',
                    key: 'categoryId'
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

        return (
            <div style={{backgroundColor:'#f0f0f0',minHeight:777 }}>
                <Row>
                    <Col span="24" style={{backgroundColor:'#f0f0f0' }}>
                        <CLContentCard title="操作" icon="edit" minHeight="20">
                            <Button type="primary" className={styles.button} onClick={this.showForm}>新增</Button>
                        </CLContentCard>
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span="4" style={{backgroundColor:'#f0f0f0' }}>
                        <div style={{marginRight:10,backgroundColor:"#f0f0f0"}}>
                            <CLContentCard title="选择类型" icon="ellipsis" >
                                <CLTree treeUrl="/api/infoCategory/listByPid" treeNode={this.treeNode}  onSelect = {this.treeNodeOnSelect}/>
                            </CLContentCard>
                        </div>
                    </Col>
                    <Col span="20" style={{backgroundColor:'white' }}>
                        <CLContentCard title="类型列表" icon="bars">
                            <Table dataSource={this.state.tableModel.data} columns={this.columns} size="middle" pagination={this.state.tableModel.pagination} rowKey={this.rowKey}
                                   loading={this.state.tableModel.loading} onChange={this.state.tableModel.tableChange}/>
                            <CLModalForm visible={this.state.formVisible} onClose={this.formClose} formItems={formItems} edit={this.state.edit} formData={this.state.formData}
                                         updateUrl='/api/infoCategory/update' addUrl='/api/infoCategory/add'/>
                        </CLContentCard>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default InfoCategory;

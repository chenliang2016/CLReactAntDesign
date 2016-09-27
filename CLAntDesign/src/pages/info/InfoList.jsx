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

import CLContentCard from '../../components/CLContentCard';
import CLTree from '../../components/CLTree';
import styles from "../style/pageStyle.less";

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
                        <Link to={tourl} >修改</Link>
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

        this.tableModel = new TableModel('/api/info/list', (model) => {
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
    }

    deleteHandle = (record) => {
        const self = this;

        return function() {
            confirm({
                title: '提示',
                content: '确认删除？',
                onOk() {
                    Ajax.get('/api/info/delete', {id: record.infoId}).then(() => {
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

    infoAdd = () => {
        var self = this;
        self.props.history.replaceState(null, '/info/infoAdd')
    };

    rowKey = (row) => {
        return row.infoId;
    };

    formClose = (d) => {
        if (d) {
            this.tableModel.fetch();
        }
        this.setState({formVisible: false});
    };

    treeNodeOnSelect = (info) => {
        var params = {
            categoryId : info[0]
        }
        this.state.tableModel.fetch(params)
    };

    render(){
        return (
            <div style={{backgroundColor:'#f0f0f0',minHeight:777 }}>
                <Row>
                    <Col span="24" style={{backgroundColor:'#f0f0f0' }}>
                        <CLContentCard title="操作" icon="edit" minHeight="20">
                            <Button type="primary" className={styles.button} onClick={this.infoAdd}>新增</Button>
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
                        </CLContentCard>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default InfoList;
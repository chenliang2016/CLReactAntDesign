import React from 'react';
import {
    Table,
    Form,
    Input,
    Button,
    Modal,
    Divider
} from 'antd';
const confirm = Modal.confirm;
import CLContentCard from 'components/CLContentCard';
import CLModalForm from 'components/CLModalForm';
import styles from "page/style/pageStyle.less";


import fetchUtil from 'utils/fetchUtil';
import CLContentCardWithClose from './CLContentCardWithClose';

class LMMCommonCURD extends React.Component {

    constructor(props) {
        super(props);

        var self = this;

        this.columns = props.columns;

        let otherDeals = props.otherDeals;

        if (otherDeals == undefined){
            otherDeals = [];
        }

        this.columns.push({
            title: '操作',
            key: '操作',
            render: function(text, record, index) {
                return <div>
                    <a onClick={self.editHandle(record, index)}>修改</a>
                  <Divider type='vertical'/>
                  <a onClick={self.deleteHandle(record, index)}>删除</a>
                  {
                    otherDeals.map((item,index) => {
                        return <span key={index}>
                            <Divider type='vertical'/>
                            <a onClick={() => item.dealAction(record, index)}>{item.title}</a>
                        </span>
                    })
                  }
                </div>;
            }
        })

        this.state = {
            loading:false,
            data:[],
            count:0,
            formVisible:false,
            formedit:false,
            formdata:{},
        }
    }

    componentDidMount() {
        this.page = 1;
        if (this.props.bindRef != undefined){
            this.props.bindRef(this)
        }else{
            this.getlist();
        }
    }

    loaddata = () => {
        this.page = 1;
        this.getlist();
    }

    getlist(){
        this.setState({loading:true});
        if (this.props.reloadData == undefined){
            fetchUtil.get(`${this.props.apiList}?page=${this.page}&size=10`).then((data) => {
                this.setState({loading:false});
                this.setState({data:data.rows,count:data.count})
            })
        }else {
            this.props.reloadData(this.page)
            .then((data) => {
                this.setState({loading:false});
                this.setState({data:data.rows,count:data.count})
            })
        }
    }

    deleteHandle(record) {
        const self = this;
        return () => {
            confirm({
                title: '提示',
                content: '确认删除？',
                onOk() {
                    fetchUtil.get(`${self.props.apiDelete}?id=${record.id}`).then(() => {
                        self.getlist();
                    })
                },
                onCancel() {}
            });
        };
    };

    editHandle(record, index){
        return () =>  {
            let formdata = Object.assign({},record,this.props.otherForm); 
            this.setState({formdata:formdata,formedit:true,formVisible:true});
        };
    };

    showForm = ()=> {
        let formdata = Object.assign({},{},this.props.otherForm); 
        this.setState({formdata:formdata,formedit:false,formVisible:true});
    };

    formClose = (d) => {
        this.setState({formdata:{},formedit:false,formVisible:false});
        this.getlist();
    };

    render() {

        const self = this;

        const pagination = {
            total: this.state.count,
            showTotal:total => `共 ${total} 项`,
            pageSize:10,
            onChange(current) {
                self.page = current;
                self.getlist();
            },
        };

        const tableProps = {
            columns:this.columns,
            rowKey:record => record.id,
            dataSource:this.state.data,
            pagination:pagination,
            loading:this.state.loading,
            size:"middle"
        };

        let title = this.props.title + "列表";

        let showClose = false;
        if (this.props.showClose != undefined && this.props.showClose){
            showClose = true;
        }

        if (showClose){
            return (
                <CLContentCardWithClose 
                onCloseCard = {() => this.props.closeAction()}
                title={title} icon="bars">
                    <div className={styles.operateDiv}>
                        <Button type="primary"  onClick={this.showForm}>新增{this.props.title}</Button>
                    </div>
                    <Table {...tableProps}/>
                    <CLModalForm  onClose={this.formClose} formItems={this.props.formItems}  visible={this.state.formVisible} edit={this.state.formedit}
                                  formData={this.state.formdata}
                                updateUrl={this.props.apiUpdate} addUrl={this.props.apiAdd} />
                </CLContentCardWithClose>
            );
        }else{
            return (
                <CLContentCard title={title} icon="bars">
                    <div className={styles.operateDiv}>
                        <Button type="primary"  onClick={this.showForm}>新增{this.props.title}</Button>
                    </div>
                    <Table {...tableProps}/>
                    <CLModalForm  onClose={this.formClose} formItems={this.props.formItems}  visible={this.state.formVisible} edit={this.state.formedit}
                                  formData={this.state.formdata}
                                updateUrl={this.props.apiUpdate} addUrl={this.props.apiAdd} />
                </CLContentCard>
            );
        }
    }
}

export default LMMCommonCURD;

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
import LmmTableViewSearch from 'components/LmmTableViewSearch';

class LmmTableView extends React.Component {

    constructor(props) {
        super(props);

        var self = this;

        this.searchFields = props.searchFields;

        this.columns = props.columns;

        let otherDeals = props.otherDeals;

        if (otherDeals == undefined){
            otherDeals = [];
        }

        this.state = {
            loading:false,
            data:[],
            count:0,
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

            let url = `${this.props.apiList}?page=${this.page}&size=10`;
            
            if (this.searchValues != undefined){
                for (var key of Object.keys(this.searchValues)){
                    let value = this.searchValues[key];
                    if (value != undefined && value != ""){
                        url = url + `&${key}=${value}`
                    }
                }
            }
            
            fetchUtil.get(url).then((data) => {
                this.setState({loading:false});
                this.setState({data:data.rows,count:data.count})
            })
        }else {
            this.props.reloadData(this.page,this.searchValues)
            .then((data) => {
                this.setState({loading:false});
                this.setState({data:data.rows,count:data.count})
            })
        }
    }

    search = (values) => {
        this.searchValues = values;
        this.page = 1;
        this.getlist();
    }


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

        

        return (
            <CLContentCard title={title} icon="bars">
                {this.props.searchFields != undefined && Object.keys(this.props.searchFields).length>0?
                    <LmmTableViewSearch 
                    searchAction = {(values) => this.search(values)}
                    searchFields = {this.searchFields}/>
                :null
                }
                <Table {...tableProps}/>
            </CLContentCard>
        );
    }
}

export default LmmTableView;

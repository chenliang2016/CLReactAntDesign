### 使用curd控件

```
import React from 'react';
import LmmTableView from 'components/LmmTableView'
import moment from 'moment'

class TradeList extends React.Component {

    constructor() {
        super();
    }

    render() {

        const self = this;

        let columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                minWidth: '100'
            }, 
            {
                title: '交易号',
                dataIndex: 'tradeNo',
                key: 'tradeNo',
                minWidth: '100'
            }, 
            {
                title: '交易时间',
                key: 'tradedAt',
                minWidth: '100',
                render: function(text, record, index) {
                    let timeString = moment(record.tradedAt).format('YYYY-MM-DD HH:mm:ss');
                    return <div>
                        {timeString}
                    </div>;
                }
            }, 
            {
                title: '状态',
                key: 'state',
                minWidth: '100',
                render: function(text, record, index) {
                    let divtext = '待支付';
                    if (record.state == 1){
                        divtext = '待支付'
                    }else if (record.state == 2){
                        divtext = '已支付'
                    }
                    return <div>
                        {divtext}
                    </div>;
                }
            }, 
           
        ];

        let searchFields = [{
            title:'用户名',
            attr:'name',
            type:'input'
        },{
            title:'交易号',
            attr:'tradeNo',
            type:'input'
        }]

        let tableProps = {
            title:'交易',
            columns:columns,
            searchFields:searchFields,
            apiList:'/api/b/trade/alltrade',//必须返回rows，count两个参数,get方法
        }

        return (
            <div>
                <LmmTableView {...tableProps}/>
            </div>
        );
    }
}

export default TradeList;


```
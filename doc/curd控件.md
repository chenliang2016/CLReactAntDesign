### 使用curd控件

```
import React from 'react';
import LMMCommonCURD from 'components/LMMCommonCURD'
import fetchUtil from 'utils/fetchUtil';

class EquipmentList extends React.Component {

    constructor() {
        super();
    }

	//reloadData,返回的格式必须是{rows:[],count:0}
    reloadData = (page,searchValues) => {
        console.log(searchValues);
        return fetchUtil.get(`/api/equipment/list?page=${page}&size=10`)
    }

    componentDidMount() {
      
    }
    
    loadData = () => {
        this.curdComponent.loaddata();
    }

    render() {

        const self = this;

        const formItems = [
        {
            type:"Input",
            title:"ip地址",
            arrname:"ip",
            require:true,
        },
        {
            type:"Input",
            title:"详细地址",
            arrname:"address",
            require:true,
        },
        {
            type:"Input",
            title:"设备编号",
            arrname:"areaNo",
            require:true,
        },
        {
            type:"Input",
            title:"经度",
            arrname:"lat",
            require:true,
        },
        {
            type:"Input",
            title:"纬度",
            arrname:"lng",
            require:true,
        },
        ];

        let columns = [
            {
                title: '设备ip',
                dataIndex: 'ip',
                key: 'ip',
                minWidth: '100'
            }, {
                title: '所在地址',
                dataIndex: 'address',
                key: 'address',
                minWidth: '100'
            }, 
            {
                title: '区域编号',
                dataIndex: 'areaNo',
                key: 'areaNo',
                minWidth: '100'
            }, 
            {
                title: 'state',
                dataIndex: '状态',
                key: '状态',
                minWidth: '100'
            }, 
            {
                title: '经纬度',
                key: 'lat-lng',
                minWidth: '100',
                render: function(text, record, index) {
                    return <div>
                        {record.lat},{record.lng}
                    </div>;
                }
            }, 
        ];

        let searchFields = [{
            title:'地址',
            attr:'address',
            type:'input'
        }]

        let curdProps = {
            title:'设备',
            columns:columns,
            apiList:'/api/equipment/list',//必须返回rows，count两个参数,get方法
            apiDelete:'/api/equipment/delete',//唯一主键属性名称必须为id,get方法
            apiUpdate:'/api/equipment/update',//post方法
            apiAdd:'/api/equipment/add',//post方法
            formItems:formItems,
            showClose:true,//是否在右上角显示关闭按钮
            otherForm:{},//可以添加额外定死的参数
            closeAction:() => this.props.onClose(),
            bindRef:(ref) => this.curdComponent = ref,//绑定子组件，可用this.curdComponent直接调用curd方法
            reloadData:(page,searchValues) => {return this.reloadData(page,searchValues)}, //配合searchFields使用，返回相应的keyvalues
            searchFields:searchFields,//需要搜索的字段，跟标题
        }

        return (
            <LMMCommonCURD {...curdProps}/>
        );
    }
}

export default EquipmentList;

```
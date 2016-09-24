import React from 'react';
import CLForm from '../../components/CLForm';
import CLContentCard from '../../components/CLContentCard';

class InfoAdd extends React.Component{

    constructor() {
        super();
        this.state = {
            edit: false,
        }
    }

    render(){

        const formItems = [
            {
                type:"TreeSelect",
                title:"类别",
                arrname:"categoryId",
                treeUrl:"/api/infoCategory/listByPid",
                treeSelectFormValue:"categoryId",
                treeSelectFormTitle:"categoryName",
                treeNode:{
                    title: 'categoryName',
                    key: 'categoryId'
                }
            },
            {
                type:"Input",
                title:"标题",
                arrname:"topic"
            },
            {
                type:"Input",
                title:"城市",
                arrname:"city"
            },
            {
                type:"Input",
                title:"跳转地址",
                arrname:"url"
            },
            {
                type:"Input",
                title:"描述",
                arrname:"infoDes"
            },
            {
                type:"UploadImg",
                title:"缩略图",
                arrname:"headImage"
            },
            {
                type:"Editor",
                title:"内容",
                arrname:"content"
            }
        ];

        return(
            <CLContentCard title="信息发布" icon="edit">
                <CLForm formItems={formItems} edit={this.state.edit} submitTitle="保存"
                             updateUrl='/api/user/update' addUrl='/api/user/add'/>
            </CLContentCard>
        );
    }
}

export default InfoAdd;
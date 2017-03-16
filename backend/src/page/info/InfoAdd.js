import React from 'react';
import CLForm from '../../components/CLForm';
import CLContentCard from '../../components/CLContentCard';
import { message } from 'antd';
import { connect } from 'react-redux'
import {replace} from 'react-router-redux'

import {infoAdd} from '../../actions/infoAction'

@connect(state => ({
    infoData:state.info.formData,
    formedit:state.info.formedit
}))
class InfoAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            formData:{}
        }
    }

    onSubmitSuccess = (e)=> {
        message.info('保存成功');
        const {dispatch} = this.props;
        dispatch(replace('/info/infoList'));
        dispatch(infoAdd());
    };

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
                    key: 'categoryId',
                    pkey:'pCategoryId'
                },
                require:true
            },
            {
                type:"Input",
                title:"标题",
                arrname:"topic",
                require:true
            },
            {
                type:"Input",
                title:"城市",
                arrname:"city",
                require:true
            },
            {
                type:"Input",
                title:"跳转地址",
                arrname:"url",
                require:true
            },
            {
                type:"Input",
                title:"描述",
                arrname:"infoDes"
            },
            {
                type:"UploadImg",
                title:"缩略图",
                arrname:"headImage",
                require:true
            },
            {
                type:"Editor",
                title:"内容",
                arrname:"content",
                require:true
            }
        ];

        const formProps = {
            edit:this.props.formedit,
            formData:this.props.infoData,
            formItems:formItems,
            onSubmitSuccess:this.onSubmitSuccess,
            updateUrl:'/api/info/update',
            addUrl:'/api/info/add'
        };

        return(
            <CLContentCard title="信息发布" icon="edit">
                <CLForm {...formProps} />
            </CLContentCard>
        );
    }
}

export default InfoAdd;
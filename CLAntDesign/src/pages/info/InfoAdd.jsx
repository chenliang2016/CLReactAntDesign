import React from 'react';
import CLForm from '../../components/CLForm';
import CLContentCard from '../../components/CLContentCard';
import { message } from 'antd';
import {Ajax} from '../../libs/common';

class InfoAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            formData:{}
        }
    }

    onSubmitSuccess = (e) => {
        var self = this;
        message.info('创建成功');
        self.props.history.replaceState(null, '/info/infoList')
    };

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
        console.log(nextProps);
        var self = this;

        var id = nextProps.params.id;

        if(id==undefined){
            self.setState({formData:{}});
        }else{
            this.getDetail(id);
        }
    }

    componentDidMount(){
        var id = this.props.params.id;

        if(id==undefined){
            this.setState({formData:{}});
        }else{
            this.getDetail(id);
        }
    }

    getDetail(id){
        var self = this;
        Ajax.get('/api/info/detail', {infoId:id}).then((d) => {
            if (d.info!=undefined){
                self.setState({
                    formData:d.info,
                    edit:true,
                })
            }else{
                message.error('获取详情失败');
                self.props.history.replaceState(null, '/info/infoList')
            }
        });
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
                    key: 'categoryId'
                }
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
                <CLForm formItems={formItems} onSubmitSuccess={this.onSubmitSuccess} edit={this.state.edit} submitTitle="保存"
                             updateUrl='/api/info/update' addUrl='/api/info/add' formData={this.state.formData} />
            </CLContentCard>
        );
    }
}

export default InfoAdd;
/**
 * Created by cl on 2016/10/20.
 */
import React from 'react';
import {Button, Input, Form, Modal,Upload,Icon,Select} from 'antd';
import fetchUtil from '../libs/fetchUtil';
const createForm = Form.create;
const FormItem = Form.Item;
import CLTreeSelect from './CLTreeSelect';
import CLUploadImage from './CLUploadImage';
import CLUploadFiles from './CLUploadFiles';
import {constant} from '../libs/constant';

class CLModalForm extends React.Component{
    static defaultProps = {
        visible: false,
        onClose: function() {},
        formData: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            edit: false,
        };
        this.formItems = props.formItems;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    handleOk = (e)=> {
        e.preventDefault();
        const self = this;
        const {resetFields,validateFields} = this.props.form;
        validateFields((errors, values) => {

            if (!!errors) {
                return;
            }

            self.setState({loading: true});

            var updateUrl = this.props.updateUrl;
            var addUrl = this.props.addUrl;

            const formData = Object.assign(this.props.formData, values);
            fetchUtil.post(this.state.edit
                ? updateUrl
                : addUrl, formData)
                .then((rs)=>{
                    if (rs.success) {
                        self.setState({loading: false});
                        resetFields();
                        self.props.onClose(rs);
                    } else {
                        self.setState({loading: false});
                    }
                },e =>{
                    self.setState({loading: false});
                });
        });

    };

    handleCancel = ()=> {
        this.props.form.resetFields();
        this.props.onClose();
    };



    /*
     ＊树节点点击事件，更新formdata表单值
     *info:tree选择的value值
     *node:tree选择的节点
     *treeSelectFormTitle:tree选中后获取到的title值想要改变表单中对应的哪个字段
     *treeSelectFormValue:tree选中后获取到的value值想要改变表单中对应的哪个字段
     */
    treeNodeOnSelect = (info,node,treeSelectFormTitle,treeSelectFormValue) => {

        const treeSelectValue = info;

        const {setFieldsValue} = this.props.form;

        setFieldsValue({[treeSelectFormValue]:treeSelectValue});

        if (treeSelectFormTitle != undefined) {
            this.props.formData[treeSelectFormTitle] = node.props.title;
        }
        if (treeSelectFormValue != undefined) {
            this.props.formData[treeSelectFormValue] = info;
        }

    };

    renderFormItem = () => {

        const { getFieldDecorator,setFieldsValue}  = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 12
            }
        };
        const formdata = this.props.formData;


        const loopFormItems = data => data.map((item) => {

            const placeholder = "请填写"+item.title;
            const title = item.title+"：";
            const arrname = item.arrname;
            const type = item.type;
            let value;

            if (formdata[arrname]){
                value = ""+formdata[arrname];
            }

            const require = item.require;
            const rules = item.rules;

            let options = {};
            options.initialValue = value;


            options.rules = [
                { required: require,message: item.title+"为必填项" },
            ];

            if (rules){
                options.rules = rules;
            }

            let componentDecorator = getFieldDecorator(arrname,options);

            if (type == "Input") {
                return <FormItem key={arrname} {...formItemLayout} label={title}>
                    {componentDecorator(<Input placeholder={placeholder} />)}
                </FormItem>;
            }else if(type == "TreeSelect"){
                var treeUrl = item.treeUrl;
                var treeNode = item.treeNode;
                var treeSelectFormTitle = item.treeSelectFormTitle;
                var treeSelectFormValue = item.treeSelectFormValue;

                var rootKey = item.rootKey;

                var treeSelectProps = {
                    treeUrl:treeUrl,
                    treeNode:treeNode,
                    treeSelectFormTitle:treeSelectFormTitle,
                    treeSelectFormValue:treeSelectFormValue,
                    onTreeNodeSelect:this.treeNodeOnSelect
                };

                if (rootKey != undefined){
                    treeSelectProps.rootKey = rootKey;
                }

                return  <FormItem key={treeSelectFormValue} {...formItemLayout} label={title}>
                    {componentDecorator(<CLTreeSelect
                        {...treeSelectProps} />)}
                </FormItem>
            }else if(type == "UploadImg"){
                //图片上传成功后回调
                const onImageUploadSuccess = (formitem, url) => {
                    setFieldsValue({[arrname]: url});
                };

                return <FormItem key={arrname} label={title}>
                    {componentDecorator(<CLUploadImage  onUploadSuccess={onImageUploadSuccess}
                                                        formItem={arrname}/>)}
                </FormItem>
            }else if(type == "UploadFiles"){
                //多个文件上传
                const onFilesChangeSuccess = (formitem, urls) => {
                    setFieldsValue({[arrname]: urls});
                };

                return <FormItem key={arrname} label={title}>
                    {componentDecorator(<CLUploadFiles formItem={arrname}
                                                       onFilesChangeSuccess={onFilesChangeSuccess}/>)}
                </FormItem>
            }
            return  <FormItem key={arrname} {...formItemLayout} label={title}>
                {componentDecorator(<Input placeholder={placeholder}/>)}
            </FormItem>;
        });

        let nodeformItems;
        if (this.formItems!=undefined) {
            nodeformItems = loopFormItems(this.formItems)
        }
        return nodeformItems;
    };

    render() {

        this.nodeformItems = this.renderFormItem();


        return (
            <div>
                <Modal ref="modal" visible={this.props.visible} title={this.state.edit
                    ? '修改'
                    : '新增'} onOk={this.handleOk} onCancel={this.handleCancel} footer={[<Button key = "back" type = "ghost" size = "large" onClick = {
                    this.handleCancel
                } > 返 回 </Button>, <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}> 提 交 </Button >]}>
                    <Form horizontal>
                        { this.nodeformItems }
                    </Form>
                </Modal>
            </div>
        );
    }
}

CLModalForm = createForm()(CLModalForm);

export default CLModalForm;

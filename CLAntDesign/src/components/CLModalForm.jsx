import React from 'react';
import {Button, Input, Form, Modal,Upload,Icon,Select} from 'antd';
import {Ajax} from '../libs/common';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
import CLTreeSelect from './CLTreeSelect';
import CLUploadImage from './CLUploadImage';
import CLUploadFiles from './CLUploadFiles';
import {constant} from '../libs/constant';

let CLModalForm = React.createClass({
    mixins: [Form.ValueMixin],
    getDefaultProps: function() {
        return {
            visible: false,
            onClose: function() {},
            formData: {}
        };
    },
    getInitialState: function() {
        var state = {
            loading: false,
            edit: false,
        };
        state.formData = this.props.formData;
        return state;
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    },
    handleOk(e) {
        e.preventDefault();
        var self = this;
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }

            self.setState({loading: true});

            var updateUrl = this.props.updateUrl;
            var addUrl = this.props.addUrl;

            Ajax.post(this.state.edit
                ? updateUrl
                : addUrl, this.state.formData).then((d) => {
                if (d.success) {
                    self.setState({loading: false});
                    self.props.onClose(d);
                } else {
                    self.setState({loading: false});
                }
            });
        });

    },
    handleCancel() {
        this.props.onClose();
    },

    /*
    ＊树节点点击事件，更新formdata表单值
    *info:tree选择的value值
    *node:tree选择的节点
    *treeSelectFormTitle:tree选中后获取到的title值想要改变表单中对应的哪个字段
    *treeSelectFormValue:tree选中后获取到的value值想要改变表单中对应的哪个字段
     */
    treeNodeOnSelect(info,node,treeSelectFormTitle,treeSelectFormValue) {
        if (treeSelectFormTitle != undefined) {
            this.state.formData[treeSelectFormTitle] = node.props.title;
        }
        if (treeSelectFormValue != undefined) {
            this.state.formData[treeSelectFormValue] = info;
        }
    },

    //图片上传成功后回调
    onImageUploadSuccess(formitem,url){
        this.state.formData[formitem] = url;
    },

    //多个文件上传
    onFilesChangeSuccess(formitem,urls){
        this.state.formData[formitem] = urls;
    },

    checkInput(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['name'], { force: true });
        }
        callback();
    },

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 12
            }
        };

        var formdata = this.state.formData;

        var self = this;

        const loopFormItems = data => data.map((item) => {

               var placeholder = "填写"+item.title;
               var title = item.title+"：";
               var arrname = item.arrname;
               var type = item.type;
               var value = formdata[arrname];
               var require = item.require;

               if (type == "Input") {
                   if (require){
                       let onInputChange = (e)=>{
                           self.state.formData[arrname] = e.target.value;
                       };
                       const inputProps = getFieldProps(arrname, {
                           rules: [
                               { required: true ,message: '请输入'+item.title},
                           ],
                           onChange:onInputChange,
                           initialValue:value,
                       });
                       return <FormItem {...formItemLayout} label={title}>
                           <Input {...inputProps} placeholder={placeholder} name={arrname} value={value}
                                  />
                       </FormItem>;
                   }else {
                       return <FormItem {...formItemLayout} label={title}>
                           <Input id={arrname} placeholder={placeholder} name={arrname} value={value}
                                  onChange={this.setValue.bind(this, arrname)}/>
                       </FormItem>;
                   }
               }else if(type == "TreeSelect"){
                    var treeUrl = item.treeUrl;
                    var treeNode = item.treeNode;
                    var treeSelectFormTitle = item.treeSelectFormTitle;
                    var treeSelectFormValue = item.treeSelectFormValue;

                    var rootKey = item.rootKey;

                    var treeSelectProps = {
                        value:value,
                        treeUrl:treeUrl,
                        treeNode:treeNode,
                        treeSelectFormTitle:treeSelectFormTitle,
                        treeSelectFormValue:treeSelectFormValue,
                        onTreeNodeSelect:this.treeNodeOnSelect
                    };

                    if (rootKey != undefined){
                        treeSelectProps.rootKey = rootKey;
                    }

                    return  <FormItem {...formItemLayout} label={title}>
                                <CLTreeSelect
                                    {...treeSelectProps} />
                            </FormItem>
               }else if(type == "UploadImg"){
                    var defaultFileList = value;

                    //获取图片列表 start
                    var files = [];

                    if (defaultFileList!=undefined) {
                        defaultFileList.split(";").map(function (val,index) {
                        var fileurl = constant.urlPrex + val;
                        files.push(
                            {
                                uid: index,
                                name: val,
                                status: 'done',
                                url: fileurl,
                            }
                        )
                        });
                    }
                    //获取图片列表 end

                    return  <FormItem {...formItemLayout} label={title}>
                                 <CLUploadImage fileList={files} onUploadSuccess={this.onImageUploadSuccess} formItem={arrname} />
                            </FormItem>
               }else if(type == "UploadFiles"){
                    var defaultFileList = value;

                    //获取图片列表 start
                    var files = [];

                    if (defaultFileList!=undefined) {
                        defaultFileList.split(";").map(function (val,index) {
                        var fileurl = constant.urlPrex + val;
                        files.push(
                            {
                                uid: index,
                                name: val,
                                status: 'done',
                                url: fileurl,
                            }
                        )
                        });
                    }
                    //获取图片列表 end

                    return  <FormItem {...formItemLayout} label={title}>
                                 <CLUploadFiles fileList={files} formItem={arrname} onFilesChangeSuccess={this.onFilesChangeSuccess} />
                            </FormItem>
               }
               return  <FormItem {...formItemLayout} label={title}>
                            <Input placeholder={placeholder} name={arrname} value={value} onChange={this.setValue.bind(this, arrname)}/>
                       </FormItem>;
        });

        const formitems = this.props.formItems;
        var nodeformItems;
        if (formitems!=undefined) {
            nodeformItems = loopFormItems(formitems)
        }

        return (
            <div>
                <Modal ref="modal" visible={this.props.visible} title={this.state.edit
                    ? '修改'
                    : '新增'} onOk={this.handleOk} onCancel={this.handleCancel} footer={[<Button key = "back" type = "ghost" size = "large" onClick = {
                        this.handleCancel
                    } > 返 回 </Button>, <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}> 提 交 </Button >]}>
                    <Form horizontal>
                        { nodeformItems }
                    </Form>
                </Modal>
            </div>
        );
    }
});

CLModalForm = createForm()(CLModalForm);

export default CLModalForm;

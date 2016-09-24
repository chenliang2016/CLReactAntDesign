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
import CLSimditor from './CLSimditor';
import styles from './CLForm.less';

let CLForm = React.createClass({
    mixins: [Form.ValueMixin],
    getDefaultProps: function() {
        return {
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
    handleOk() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            var self = this;
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

    //富文本编辑器改变事件
    onEditorChange(name,value){
        this.state.formData[name] = value;
    },

    render() {
        // const { getFieldProps } = this.props.form;
        const { form } = this.props;

        console.log(form);

        var formdata = this.state.formData;

        // const inputProps = getFieldProps(arrname, {
        //     rules: [
        //         { required: true, message: '请输入' },
        //     ],
        // });

        const loopFormItems = data => data.map((item) => {

            var placeholder = "填写"+item.title;
            var title = item.title+"：";
            var arrname = item.arrname;
            var type = item.type;
            var value = formdata[arrname];
            var require = item.require;

            if (type == "Input") {
                // if (require){
                //     return <div className={styles.formItemContainer}>
                //         <div className={styles.formItemTitle}>{title}</div>
                //         <Input {...inputProps} placeholder={placeholder} size="large" name={arrname} value={value} onChange={this.setValue.bind(this, arrname)} />
                //     </div>;
                // }else{
                    return <div className={styles.formItemContainer}>
                        <div className={styles.formItemTitle}>{title}</div>
                        <Input placeholder={placeholder} size="large" name={arrname} value={value} onChange={this.setValue.bind(this, arrname)} />
                    </div>;
                // }
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

                return  <div className={styles.formItemContainer}>
                    <div className={styles.formItemTitle}>{title}</div>
                    <CLTreeSelect
                        {...treeSelectProps}/>
                </div>
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

                return  <div className={styles.formItemContainer}>
                    <div className={styles.formItemTitle}>{title}</div>
                    <CLUploadImage fileList={files} onUploadSuccess={this.onImageUploadSuccess} formItem={arrname} />
                </div>
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

                return  <div className={styles.formItemContainer}>
                    <div className={styles.formItemTitle}>{title}</div>
                    <CLUploadFiles fileList={files} formItem={arrname} onFilesChangeSuccess={this.onFilesChangeSuccess} />
                </div>
            }else if (type == "Editor"){
                return <div className={styles.formItemContainer}>
                    <div className={styles.formItemTitle}>{title}</div> <CLSimditor name={arrname} value={value} onChange={this.onEditorChange} /> </div>;
            }
            return  <div className={styles.formItemContainer}>
                <div className={styles.formItemTitle}>{title}</div>
                <Input size="large" placeholder={placeholder} name={arrname} value={value} onChange={this.setValue.bind(this, arrname)}/>
            </div>;
        });

        const formitems = this.props.formItems;
        var nodeformItems;
        if (formitems!=undefined) {
            nodeformItems = loopFormItems(formitems)
        }

        return (
            <div>
                <Form horizontal form={this.props.form}>
                        { nodeformItems }
                    <Button type="primary" htmlType="submit" size="large" onClick={this.handleOk}>{this.props.submitTitle}</Button>
                </Form>
            </div>
        );
    }
});

export default CLForm;

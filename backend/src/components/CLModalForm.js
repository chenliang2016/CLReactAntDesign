/**
 * Created by cl on 2016/10/20.
 */
import React from 'react';
import {
    Button,
    Input,
    Form,
    Modal,
    Upload,
    Icon,
    Select,
    DatePicker
} from 'antd';
const Option = Select.Option;
import moment from 'moment';
import fetchUtil from '../libs/fetchUtil';
const createForm = Form.create;
const FormItem = Form.Item;
import CLTreeSelect from './CLTreeSelect';
import CLUploadImage from './CLUploadImage';
import CLUploadImageToQiniu from './CLUploadImageToQiniu';
import CLUploadFiles from './CLUploadFiles';
import {
    constant
} from '../libs/constant';

class CLModalForm extends React.Component {
    static defaultProps = {
        visible: false,
        onClose: function() {},
        formData: {},
        dateFormatList: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            edit: false,
        };
        this.dateFormatList = props.dateFormatList;
        this.deleteFormItemList = props.deleteFormItemList;
        this.formItems = props.formItems;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    handleOk = (e) => {
        e.preventDefault();
        const self = this;
        const {
            resetFields,
            validateFields
        } = this.props.form;
        validateFields((errors, values) => {

            if (!!errors) {
                return;
            }

            self.setState({
                loading: true
            });

            const newValus = {
                ...values,
            };

            this.dateFormatList.map((title) => {
                newValus[title] = values[title].format('YYYY-MM-DD HH:mm:ss');
            })

            var updateUrl = this.props.updateUrl;
            var addUrl = this.props.addUrl;

            const formData = Object.assign(this.props.formData, newValus);

            if (this.deleteFormItemList != undefined){
              this.deleteFormItemList.map((title) => {
                  delete formData[title];
              })
            }

            fetchUtil.post(this.state.edit ? updateUrl : addUrl, formData)
                .then((rs) => {
                    if (rs.success) {
                        self.setState({
                            loading: false
                        });
                        resetFields();
                        self.props.onClose(rs);
                    } else {
                        self.setState({
                            loading: false
                        });
                    }
                }, e => {
                    self.setState({
                        loading: false
                    });
                });
        });

    };

    handleCancel = () => {
        this.props.form.resetFields();
        this.props.onClose();
    };

    renderFormItem = () => {

        const {
            getFieldDecorator,
            setFieldsValue
        } = this.props.form;

      const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        const formdata = this.props.formData;


        const loopFormItems = data => data.map((item) => {

            const placeholder = "请填写" + item.title;
            const title = item.title + "：";
            const arrname = item.arrname;
            const type = item.type;
            let value;

            if (formdata[arrname]) {
                value = "" + formdata[arrname];
            }

            const require = item.require;
            const rules = item.rules;

            let options = {};

            const dateFormat = "YYYY-MM-DD HH:mm:ss";

            if (type != "DatePicker") {
                options.initialValue = value;
            } else {
                if (value) {
                    options.initialValue = moment.unix(value / 1000)
                }
            }

            options.rules = [{
                required: require,
                message: item.title + "为必填项"
            }, ];

            if (rules) {
                options.rules = rules;
            }

            let componentDecorator = getFieldDecorator(arrname, options);

            if (type == "Input") {
                return <FormItem key={arrname} {...formItemLayout} label={title}>
                    {componentDecorator(<Input placeholder={placeholder} />)}
                </FormItem>;
            } else if (type == "Select") {
              const handleSelectChange = (value) => {
                  console.log(value);
                  setFieldsValue({
                      [arrname]: value
                  });
              };
              let optionsDiv;
              const selectOptions = item.selectOptions;
              if (selectOptions != undefined){
                const loopOptions = options => options.map((item) => {
                      const optionvalue =  `${item.value}` ;
                      const optionname = item.name;
                      return <Option key={optionvalue} value={optionvalue}>{optionname}</Option>
                });
                optionsDiv = loopOptions(selectOptions);
              }
                return <FormItem key={arrname} {...formItemLayout} label={title}>
                    {componentDecorator(
                      <Select
                        placeholder="请选择活动类别"
                      >
                        {optionsDiv}
                      </Select>
                    )}
                </FormItem>;
            } else if (type == "TreeSelect") {
                var treeUrl = item.treeUrl;
                var treeNode = item.treeNode;
                var treeSelectFormTitle = item.treeSelectFormTitle;
                var treeSelectFormValue = item.treeSelectFormValue;

                var formValueName = item.formValueName;

                var rootKey = item.rootKey;

                const treeNodeOnSelect = (info, node, treeSelectFormTitle, treeSelectFormValue) => {

                    const treeSelectValue = info;

                    const {
                        setFieldsValue
                    } = this.props.form;

                    if (formValueName == undefined) {
                      setFieldsValue({
                          [arrname]: treeSelectValue
                      });
                    }else{
                      if (formValueName == "title")
                      {
                          setFieldsValue({
                              [arrname]: node.props.title
                          });
                      }else{
                          setFieldsValue({
                              [arrname]: info
                          });
                      }

                    }

                    if (treeSelectFormTitle != undefined) {
                        this.props.formData[treeSelectFormTitle] = node.props.title;
                    }
                    if (treeSelectFormValue != undefined) {
                        this.props.formData[treeSelectFormValue] = info;
                    }
                };

                var treeSelectProps = {
                    treeUrl: treeUrl,
                    treeNode: treeNode,
                    treeSelectFormTitle: treeSelectFormTitle,
                    treeSelectFormValue: treeSelectFormValue,
                    onTreeNodeSelect: treeNodeOnSelect
                };

                if (rootKey != undefined) {
                    treeSelectProps.rootKey = rootKey;
                }

                return <FormItem key={arrname} {...formItemLayout} label={title}>
                    {componentDecorator(<CLTreeSelect
                        {...treeSelectProps} />)}
                </FormItem>
            } else if (type == "UploadImg") {
                //图片上传成功后回调
                const onImageUploadSuccess = (formitem, url) => {
                    setFieldsValue({
                        [arrname]: url
                    });
                };

                return <FormItem key={arrname} {...formItemLayout} label={title}>
                    {componentDecorator(<CLUploadImage  onUploadSuccess={onImageUploadSuccess}
                                                        formItem={arrname}/>)}
                </FormItem>
            }else if (type == "UploadImgToQiniu") {
                    //图片上传成功后回调
                    const onImageUploadSuccess = (formitem, url) => {
                        console.log(url);
                        setFieldsValue({
                            [arrname]: url
                        });
                    };

                    return <FormItem key={arrname} {...formItemLayout} label={title}>
                        {componentDecorator(<CLUploadImageToQiniu  onUploadSuccess={onImageUploadSuccess}
                                                            formItem={arrname}/>)}
                    </FormItem>
            } else if (type == "UploadFiles") {
                //多个文件上传
                const onFilesChangeSuccess = (formitem, urls) => {
                    setFieldsValue({
                        [arrname]: urls
                    });
                };

                return <FormItem key={arrname} {...formItemLayout} label={title}>
                    {componentDecorator(<CLUploadFiles formItem={arrname}
                                                       onFilesChangeSuccess={onFilesChangeSuccess}/>)}
                </FormItem>
            } else if (type == "DatePicker") {
                return <FormItem {...formItemLayout} key={arrname} label={title}>
                        {componentDecorator(<DatePicker showTime format={dateFormat} />)}
                </FormItem>
            }
            return <FormItem key={arrname} {...formItemLayout} label={title}>
                {componentDecorator(<Input placeholder={placeholder}/>)}
            </FormItem>;
        });

        let nodeformItems;
        if (this.formItems != undefined) {
            nodeformItems = loopFormItems(this.props.formItems)
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

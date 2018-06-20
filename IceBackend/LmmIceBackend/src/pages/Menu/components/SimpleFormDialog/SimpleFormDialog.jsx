import React, { Component } from 'react';
import { Dialog, Grid, Input,TreeSelect } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

const { Row, Col } = Grid;

import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { LmmFormInput,LmmFormTreeSelect,LmmFormChooseIcon } from '../../../../components/LmmFormItem';

const ADD = gql`
   mutation CreateMenu($menuInput: MenuInput!) {
      createMenu(menuInput: $menuInput) 
    }
`;

const Edit = gql`
   mutation UpdateMenu($menuId: Int!, $menuInput: MenuInput!) {
      updateMenu(menuId:$menuId, menuInput: $menuInput)
    }
`;


export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      value: props.formData,
      isMobile: false,
    };
  }


  componentWillReceiveProps(nextProps){
    this.setState({
      value: nextProps.formData
    });
  }

  componentDidMount() {

    if (this.props.bindRef != undefined){
       this.props.bindRef(this)
    }

    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  onOk = (submitAction) => {
    this.refForm.validateAll((error,values) => {
      if (error) {
        // show validate error
        return;
      }
      // deal with value
      let variables = {
        menuInput:{
          name:values.name,
          pmenuId:values.pmenuId,
          orderNum:values.orderNum,
          tourl:values.tourl,
          icon:values.icon,
        },
      }

      if (this.props.isFormEdit){
        variables = {
          menuId:this.props.formData.menuId,
          menuInput:{
            name:values.name,
            pmenuId:values.pmenuId,
            orderNum:values.orderNum,
            icon:values.icon,
            tourl:values.tourl
          },
        }
      }

      submitAction({variables:variables})

      this.props.hideDialog();
    });
  };

  render() {
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }

    return (
      <Mutation 
      onCompleted={() =>{
        this.props.reloadData()
      }}
      mutation={this.props.isFormEdit? Edit : ADD }>
      {(submitAction, { data }) => (
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="菜单新增"
          {...this.props}
          onOk={() => this.onOk(submitAction)}
          onCancel={this.props.hideDialog}
          onClose={this.props.hideDialog}
          isFullScreen
          visible={this.props.formVisible}
        >
          <IceFormBinderWrapper
            ref={(ref) => {
              this.refForm = ref;
            }}
            value={this.state.value}
          >
            <div style={styles.dialogContent}>
              <LmmFormTreeSelect 
                treeData = {this.props.treeData}
                title='父菜单'
                attName="pmenuId"
                errorMsg="父菜单必填"
              />
              <LmmFormInput 
                title='菜单名'
                attName="name"
                placeholder="请输入菜单名"
                errorMsg="菜单名必填"
              />
              <LmmFormInput 
                title='跳转链接'
                attName="tourl"
                placeholder="请输入跳转链接"
                errorMsg="跳转链接必填"
              />
              <LmmFormInput 
                title='排序号'
                attName="orderNum"
                placeholder="请输入排序号"
                errorMsg="排序号必填"
              />
              <LmmFormChooseIcon 
                title='图标'
                attName="icon"
                placeholder="选择icon"
                errorMsg="选择icon"
              />
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        )}
        </Mutation>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  label: { lineHeight: '28px', paddingRight: '10px' },
};

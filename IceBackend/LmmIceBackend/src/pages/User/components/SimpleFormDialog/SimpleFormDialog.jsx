import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

import { LmmFormInput } from '../../../../components/LmmFormItem';

import { LmmQiniuUploadImage } from '../../../../components/LmmQiniuUpload';

import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const ADD_USER = gql`
   mutation CreateUser($userInput: UserInput!) {
      createUser(userInput: $userInput) {
        loginName
      }
    }
`;

const Edit_USER = gql`
   mutation UpdateUser($userId: Int!, $userInput: UserInput!) {
      updateUser(userId:$userId, userInput: $userInput) {
        loginName
      }
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
        userInput:values,
      }

      if (this.props.isFormEdit){
        variables = {
          userId:this.props.formData.userId,
          userInput:{
            loginName:values.loginName,
            loginPasw:values.loginPasw,
            name:values.name,
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
      mutation={this.props.isFormEdit? Edit_USER : ADD_USER }>
      {(submitAction, { data }) => (
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="用户新增"
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
              <LmmFormInput 
                title='用户名'
                attName="name"
                placeholder="请输入用户名称"
                errorMsg="请输入用户名称"
              />
              <LmmFormInput 
                title='登录名'
                attName="loginName"
                placeholder="请输入登录名"
                errorMsg="请输入登录名"
              />
              <LmmFormInput 
                title='登录密码'
                attName="loginPasw"
                placeholder="请输入密码"
                errorMsg="请输入密码"
              />
              <LmmQiniuUploadImage 
                title='七牛'
                attName="qiniu"
                placeholder="请输入七牛"
                errorMsg="请输入七牛"
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
};

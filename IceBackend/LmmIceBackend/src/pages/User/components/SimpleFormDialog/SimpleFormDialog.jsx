import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

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
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>用户名</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="请输入用户名称"
                  >
                    <Input
                      name="name"
                      style={styles.input}
                      placeholder="请输入用户名称"
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>登录名</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="请输入登录名"
                  >
                    <Input
                      name="loginName"
                      style={styles.input}
                      placeholder="请输入登录名"
                    />
                  </IceFormBinder>
                  <IceFormError name="loginName" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>登录密码</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="请输入密码"
                  >
                    <Input
                      name="loginPasw"
                      style={styles.input}
                      placeholder="请输入密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="loginPasw" />
                </Col>
              </Row>
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
};

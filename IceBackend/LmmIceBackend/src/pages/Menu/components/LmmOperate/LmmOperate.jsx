import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio, Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

import LmmTreeSelect from '../LmmTreeSelect'

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

const defaultValue = {

};

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
      <IceContainer>
        <Row>
                <Col xxs="6" s="4" l="2" style={styles.label}>
                  选择菜单:{' '}
                </Col>
                <Col>
                  <LmmTreeSelect handleChange={(value) => {
                    this.props.reloadData(value);
                  }} />
                </Col>
                <Col style={{
                  display: 'flex',
                  alignItems: 'right',
                  justifyContent: 'flex-end',}}>
                  <Button type="primary" onClick={this.props.showDialog}>
                    新增菜单
                  </Button>
                </Col>
        </Row>
      </IceContainer>
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

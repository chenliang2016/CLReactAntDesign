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
import { LmmFormInput,LmmFormTreeSelect } from '../../../../components/LmmFormItem';

const ADD = gql`
   mutation CreateRole($roleInput: RoleInput!) {
      createRole(roleInput: $roleInput) 
    }
`;

const Edit = gql`
   mutation UpdateRole($roleId: Int!, $roleInput: RoleInput!) {
      updateRole(roleId:$roleId, roleInput: $roleInput)
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
        roleInput:{
          name:values.name,
          proleId:values.proleId,
        },
      }

      if (this.props.isFormEdit){
        variables = {
          roleId:this.props.formData.roleId,
          roleInput:{
            name:values.name,
            proleId:values.proleId,
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
          title="角色新增"
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
                title='父角色'
                attName="proleId"
                errorMsg="父角色必填"
              />
              <LmmFormInput 
                title='角色名'
                attName="name"
                placeholder="请输入角色名"
                errorMsg="角色名必填"
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

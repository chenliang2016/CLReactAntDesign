import React, { Component } from 'react';
import { Dialog, Tree, Checkbox } from '@icedesign/base';
const { Node: TreeNode } = Tree;
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const CONFIG_USERROLE = gql`
   mutation ConfigUserRole($userId:Int!, $userRoles: String!) {
      configUserRole(userId:$userId,userRoles:$userRoles)
    }
`;

export default class UserRoleDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
      checkStrictly:false,
      isMobile: false,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      checkedKeys: nextProps.userRoleSelect
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

  handleCheck = (keys, info) => {
    this.setState({
      checkedKeys: keys
    });
  }

  handleCheckStrictly = () => {
    this.setState({
      checkStrictly: !this.state.checkStrictly,
      checkedKeys: []
    });
  }

  onOk = (submitAction) => {
    
      let userRoles = this.state.checkedKeys.join(',');
      let variables = {
        userId:this.props.userId,
        userRoles:userRoles,
      }

      submitAction({variables:variables})

      this.props.hideDialog();
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

    const { checkedKeys,checkStrictly } = this.state;

    const loop = data =>
      data.map(item => {
        return (
          <TreeNode  label={item.label} key={item.key}>
            {item.children && item.children.length ? loop(item.children) : null}
          </TreeNode>
        );
      });

    return (
      <Mutation 
      mutation={CONFIG_USERROLE }>
      {(submitAction, { data }) => (
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="配置用户角色"
          {...this.props}
          onOk={() => this.onOk(submitAction)}
          onCancel={this.props.hideDialog}
          onClose={this.props.hideDialog}
          isFullScreen
          visible={this.props.userRoleVisible}
        >

       
        
        <Tree
            multiple
            checkable
            checkStrictly={checkStrictly}
            checkedKeys={checkedKeys}
            onCheck={this.handleCheck}
        >
        {loop(this.props.treeData)}
        </Tree>

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

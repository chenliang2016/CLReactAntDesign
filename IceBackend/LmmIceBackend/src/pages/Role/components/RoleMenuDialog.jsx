import React, { Component } from 'react';
import { Dialog, Tree, Checkbox } from '@icedesign/base';
const { Node: TreeNode } = Tree;
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const CONFIG_ROLEMENU = gql`
   mutation ConfigRoleMenu($roleId:Int!, $roleMenus: String!) {
        configRoleMenu(roleId:$roleId,roleMenus:$roleMenus)
    }
`;

export default class RoleMenuDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
      isMobile: false,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      checkedKeys: nextProps.roleMenuSelect
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
      console.log(keys);
    this.setState({
      checkedKeys: keys
    });
  }


  onOk = (submitAction) => {
    
      let roleMenus = this.state.checkedKeys.join(',');
      let variables = {
        roleId:this.props.roleId,
        roleMenus:roleMenus,
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

    const { checkedKeys } = this.state;

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
      mutation={CONFIG_ROLEMENU }>
      {(submitAction, { data }) => (
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="配置角色菜单"
          {...this.props}
          onOk={() => this.onOk(submitAction)}
          onCancel={this.props.hideDialog}
          onClose={this.props.hideDialog}
          isFullScreen
          visible={this.props.roleMenuVisible}
        >
        <Tree
            defaultExpandAll
            multiple
            checkable
            checkStrictly={true}
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

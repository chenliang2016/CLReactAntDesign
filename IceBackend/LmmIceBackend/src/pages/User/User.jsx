import React, { Component } from 'react';

import SimpleFormDialog from './components/SimpleFormDialog';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import LmmOperate from './components/LmmOperate';

import LmmBaseTable  from '../../components/LmmBaseTable';
import UserRoleDialog from './components/UserRoleDialog';

import graphqlUtil from '../../utils/graphqlUtil';
import {getTreeData} from '../../utils/treeConvertUtil';

const GET_USERS = gql`
    query userList($page: Int!) {
      user(page: $page,size:10) {
          count,
          userlist{
            userId,
            loginName,
            loginPasw,
            name
          }
      }
  }
`

const DELETE_USER = gql`
   mutation DeleteUser($userId: Int!) {
      deleteUser(userId: $userId) {
        loginName
      }
    }
`;

const GET_USERROLES = gql`
    query UserRoles($userId: Int!) {
      userRoles(userId: $userId) {
         roleId
      }
  }
`

export default class User extends Component {
  static displayName = 'User';

  constructor(props) {
    super(props);
    this.state = {
      userId:undefined,
      formData:{},
      formVisible:false,
      userRoleVisible:false,
      isFormEdit:false,
      currentPage:1,
      treeData:[],
      userRoleSelect:[],
    };

    this.columns = [
      {
        title:"登录名",
        name:"loginName"
      },
      {
        title:"用户名",
        name:"name"
      },
    ]
  }

  componentDidMount(){
    this.getAllRoles();
  }

  getUserRoles = (userId) => {
    graphqlUtil.queryWithParams(GET_USERROLES,{userId:userId}).then(data => {

        let selectKeys = data.userRoles.map((item) => {
            return `${item.roleId}`;
        })

        this.setState({userRoleSelect:selectKeys});
     });
  }

  getAllRoles = () => {
    graphqlUtil.query(`
        query{
          allrole{
            roleId,
            name,
            proleId
          }
      }
    `).then(data => {

        const treeNode = {
          title:'name',
          key:'roleId',
          pkey:'proleId',
        }

        let list = data.allrole;
        let treeData = [];
        if (list != undefined){
            treeData = getTreeData(treeNode,list,'-1');
        }

        this.setState({treeData:treeData})
    })
  }

  changeFormData = (data) => {
    
    let formData = {
      userId:data.userId,
      loginName:data.loginName,
      loginPasw:data.loginPasw,
      name:data.name
    }

    this.setState({formData:formData, formVisible:true,isFormEdit:true})
  }

  showDialog = () => {
    this.setState({formVisible:true,isFormEdit:false,formData:{}})
  }

  hideDialog = () => {
    this.setState({
      formVisible: false,
    });
  };

  hideUserRoleDialog = () => {
    this.setState({
      userRoleVisible: false,
    });
  }

  configRole = (record) => {
      this.setState({
        userId:record.userId,
        userRoleVisible:true
      })
      this.getUserRoles(record.userId);
  }

  render() {
    return (
      <div>
      <LmmOperate showDialog={this.showDialog} />

      <SimpleFormDialog 
      isFormEdit = {this.state.isFormEdit}
      showDialog = {this.showDialog}
      hideDialog = {this.hideDialog}
      formVisible={this.state.formVisible} 
      formData={this.state.formData} 
      reloadData = {() => {this.tableRefetch()}} />

      <UserRoleDialog 
      userId = {this.state.userId}
      hideDialog = {this.hideUserRoleDialog}
      userRoleSelect = {this.state.userRoleSelect}
      treeData = {this.state.treeData}
      userRoleVisible={this.state.userRoleVisible} />

      <Query query={GET_USERS} variables={{page:1}}>
        {({ loading, error, data, refetch, fetchMore }) => {
          if (data.user == undefined){
            return null;
          }
          this.tableRefetch = refetch;
          return <div className="user-page">
                <LmmBaseTable
                  deleteQL = {DELETE_USER}
                  deleteOperate = {(deleteAction,record) => {
                    deleteAction({variables:{userId:record.userId}})
                  }}
                  columns = {this.columns}
                  loading={loading}
                  currentPage ={this.state.currentPage}
                  total={data.user.count}
                  onPageChange = {(currentPage) => {
                    fetchMore({
                      variables: {
                        page: currentPage
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        this.setState({currentPage:currentPage});
                        if (!fetchMoreResult) return prev;
                        return fetchMoreResult;
                      }
                    })
                  }}
                  editForm = {(data) => this.changeFormData(data) }  
                  data={data.user.userlist} 
                  reloadData = {() => {refetch()}} 
                  otherButtons={[
                     {
                       key:'configKey',
                       title:'配置权限',
                       action:this.configRole,
                     }
                  ]}
                />
            </div>
        }}
      </Query>
      </div>
    );
  }
}

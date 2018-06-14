import React, { Component } from 'react';
import SimpleFormDialog from './components/SimpleFormDialog';
import LmmOperate from './components/LmmOperate'

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import graphqlUtil from '../../utils/graphqlUtil';
import {getTreeData} from '../../utils/treeConvertUtil';

import LmmBaseTable  from '../../components/LmmBaseTable';
import RoleMenuDialog from './components/RoleMenuDialog';

const GET_LIST = gql`
    query roleList($proleId:Int,$page: Int!) {
      role(proleId:$proleId,page: $page,size:10) {
          count,
          rolelist{
            roleId,
            proleId,
            name,
          }
      }
  }
`

const DELETE = gql`
   mutation DeleteRole($roleId: Int!) {
      deleteRole(roleId: $roleId)
    }
`;


const GET_ROLEMENUS = gql`
    query RoleMenus($roleId: Int!) {
      roleMenus(roleId: $roleId) {
         menuId
      }
  }
`

export default class Role extends Component {
  static displayName = 'User';

  constructor(props) {
    super(props);
    this.state = {
      roleId:undefined,
      formData:{},
      formVisible:false,
      roleMenuVisible:false,
      isFormEdit:false,
      currentPage:1,
      treeData:[],
      menuTreeData:[],
      roleMenuSelect:[],
    };

    this.proleId = undefined;

    this.columns = [
      {
        title:"角色名",
        name:"name"
      },
    ]

  }

  componentDidMount(){
      this.getAllMenus();
      this.getAllRoles();
  }

  getAllMenus = () => {
    graphqlUtil.query(`
        query{
          allmenu{
            menuId,
            name,
            pmenuId
          }
      }
    `).then(data => {

        const treeNode = {
          title:'name',
          key:'menuId',
          pkey:'pmenuId',
        }

        let list = data.allmenu;
        let treeData = [];
        if (list != undefined){
            treeData = getTreeData(treeNode,list,'-1');
        }

        this.setState({menuTreeData:treeData})

    })
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

        this.setState({treeData:[{
            label:"根",
            value:'-1',
            key:'-1',
            children:treeData
          }]
        })
    })
  }

  changeFormData = (data) => {
    
    let formData = {
      proleId:data.proleId,
      roleId:data.roleId,
      name:data.name,
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

  hideRoleMenuDialog = () => {
    this.setState({
      roleMenuVisible:false
    })
  }

  configMenu = (record) => {
    this.setState({
      roleId:record.roleId,
      roleMenuVisible:true
    })
    this.getRoleMenus(record.roleId);
  }

  getRoleMenus = (roleId) => {
    graphqlUtil.queryWithParams(GET_ROLEMENUS,{roleId:roleId}).then(data => {

        let selectKeys = data.roleMenus.map((item) => {
            return `${item.menuId}`;
        })

        this.setState({roleMenuSelect:selectKeys});
     });
  }

  render() {
    return (
      <div>
      <LmmOperate 
      treeData = {this.state.treeData}
      showDialog = {this.showDialog}
      reloadData = {(proleId) => {
        if (proleId != undefined){
          this.tableRefetch({proleId:proleId})
        }else{
          this.tableRefetch();
        }
      }}
      />

      <SimpleFormDialog 
                treeData = {this.state.treeData}
                isFormEdit = {this.state.isFormEdit}
                hideDialog = {this.hideDialog}
                formVisible={this.state.formVisible} 
                formData={this.state.formData} 
                reloadData = {(proleId) => {
                  if (proleId != undefined){
                    this.tableRefetch.refetch({proleId:proleId})
                  }else{
                    this.tableRefetch.refetch();
                  }
                }} />

      <RoleMenuDialog 
        roleId = {this.state.roleId}
        hideDialog = {this.hideRoleMenuDialog}
        roleMenuSelect = {this.state.roleMenuSelect}
        treeData = {this.state.menuTreeData}
        roleMenuVisible={this.state.roleMenuVisible} />

      <Query 
      query={GET_LIST} 
      variables={{proleId:this.proleId,page:1}}>
        {({ loading, error, data, refetch, fetchMore }) => {

          this.tableRefetch = refetch;

          if (data.role == undefined){
            return null;
          }

          return <div>
                <LmmBaseTable
                  deleteQL = {DELETE}
                  deleteOperate = {(deleteAction,record) => {
                    deleteAction({variables:{roleId:record.roleId}})
                  }}
                  columns = {this.columns}
                  loading = {loading}
                  currentPage ={this.state.currentPage}
                  total={data.role.count}
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
                  data={data.role.rolelist} reloadData = {() => {refetch()}}
                  otherButtons={[
                    {
                      key:'configKey',
                      title:'配置菜单',
                      action:this.configMenu,
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

import React, { Component } from 'react';
import SimpleFormDialog from './components/SimpleFormDialog';
import LmmOperate from './components/LmmOperate'

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import graphqlUtil from '../../utils/graphqlUtil';
import {getTreeData} from '../../utils/treeConvertUtil';

import LmmBaseTable  from '../../components/LmmBaseTable';

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

export default class Role extends Component {
  static displayName = 'User';

  constructor(props) {
    super(props);
    this.state = {
      formData:{},
      formVisible:false,
      isFormEdit:false,
      currentPage:1,
      treeData:[],
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
      this.getAllRoles();
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
      <Query 
      query={GET_LIST} 
      variables={{proleId:this.proleId,page:1}}>
        {({ loading, error, data, refetch, fetchMore }) => {

          this.tableRefetch = refetch;

          if (data.role == undefined){
            return null;
          }

          return <div>
              <SimpleFormDialog 
                treeData = {this.state.treeData}
                isFormEdit = {this.state.isFormEdit}
                hideDialog = {this.hideDialog}
                formVisible={this.state.formVisible} 
                formData={this.state.formData} 
                reloadData = {(proleId) => {
                  if (proleId != undefined){
                    refetch({proleId:proleId})
                  }else{
                    refetch();
                  }
                }} />

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
                />
              
            </div>
        }}
      </Query>
      </div>
    );
  }
}

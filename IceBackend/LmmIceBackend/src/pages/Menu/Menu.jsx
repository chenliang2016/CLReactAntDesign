import React, { Component } from 'react';
import SimpleFormDialog from './components/SimpleFormDialog';
import LmmOperate from './components/LmmOperate'

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import graphqlUtil from '../../utils/graphqlUtil';
import {getTreeData} from '../../utils/treeConvertUtil';

import LmmBaseTable  from '../../components/LmmBaseTable';

const GET_MENUS = gql`
    query menuList($pmenuId:Int,$page: Int!) {
      menu(pmenuId:$pmenuId,page: $page,size:10) {
          count,
          menulist{
            pmenuId,
            menuId,
            name,
            orderNum,
            icon,
            tourl,
          }
      }
  }
`

const DELETE = gql`
   mutation DeleteMenu($menuId: Int!) {
      deleteMenu(menuId: $menuId)
    }
`;

export default class Menu extends Component {
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

    this.pmenuId = undefined;

    this.columns = [
      {
        title:"菜单名",
        name:"name"
      },
      {
        title:"菜单跳转",
        name:"tourl"
      },
      {
        title:"排序号",
        name:"orderNum"
      },
    ]

  }

  componentDidMount(){
      this.getAllMenus();
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
      pmenuId:data.pmenuId,
      menuId:data.menuId,
      name:data.name,
      orderNum:data.orderNum,
      icon:data.icon,
      tourl:data.tourl
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
      reloadData = {(pmenuId) => {
        if (pmenuId != undefined){
          this.tableRefetch({pmenuId:pmenuId})
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
                reloadData = {(pmenuId) => {
                  if (pmenuId != undefined){
                    this.tableRefetch({pmenuId:pmenuId})
                  }else{
                    this.tableRefetch();
                  }
                }} />

      <Query 
      query={GET_MENUS} 
      variables={{pmenuId:this.pmenuId,page:1}}>
        {({ loading, error, data, refetch, fetchMore }) => {

          this.tableRefetch = refetch;

          if (data.menu == undefined){
            return null;
          }

          return <div>
                <LmmBaseTable
                  deleteQL = {DELETE}
                  deleteOperate = {(deleteAction,record) => {
                    deleteAction({variables:{menuId:record.menuId}})
                  }}
                  columns = {this.columns}
                  loading = {loading}
                  currentPage ={this.state.currentPage}
                  total={data.menu.count}
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
                  data={data.menu.menulist} reloadData = {() => {refetch()}}
                />
              
            </div>
        }}
      </Query>
      </div>
    );
  }
}

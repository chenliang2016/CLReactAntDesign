import React, { Component } from 'react';
import SimpleFormDialog from './components/SimpleFormDialog';
import LmmTable from './components/LmmTable';
import LmmOperate from './components/LmmOperate'

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_MENUS = gql`
    query menuList($pmenuId:Int,$page: Int!) {
      menu(pmenuId:$pmenuId,page: $page,size:10) {
          count,
          menulist{
            name,
            orderNum,
            tourl,
          }
      }
  }
`

export default class Menu extends Component {
  static displayName = 'User';

  constructor(props) {
    super(props);
    this.state = {
      formData:{},
      formVisible:false,
      isFormEdit:false,
      currentPage:1,
    };

    this.pmenuId = undefined;
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

  render() {
    return (
      <div>
      <LmmOperate />
      <Query query={GET_MENUS} variables={{pmenuId:this.pmenuId,page:1}}>
        {({ loading, error, data, refetch, fetchMore }) => {
          return <div>
              <SimpleFormDialog 
                isFormEdit = {this.state.isFormEdit}
                showDialog = {this.showDialog}
                hideDialog = {this.hideDialog}
                formVisible={this.state.formVisible} 
                formData={this.state.formData} 
                reloadData = {(pmenuId) => {
                  if (pmenuId != undefined){
                    refetch({pmenuId:pmenuId})
                  }else{
                    refetch();
                  }
                }} />
              <LmmTable 
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
                changeFormData = {(data) => this.changeFormData(data) }  
                data={data.menu.menulist} reloadData = {() => {refetch()}} />
            </div>
        }}
      </Query>
      </div>
    );
  }
}
